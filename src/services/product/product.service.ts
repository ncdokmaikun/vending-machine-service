import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ProductModel } from '@repositories/models/product.model';
import { ProductRepository } from '@repositories/product/product.repository';
import {
  AddProductRequestBody,
  ListProductResponse,
  OrderRequestBody,
  OrderResponse,
  RestockProductRequestBody,
} from './product.service.dto';
import { ChangeRepository } from '@repositories/change/change.repository';
import { TransactionRepository } from '@repositories/transaction/transaction.repository';
import { sum } from 'lodash';
import { PaidWith } from '@repositories/models/transaction.model';
import { PaymentMethod } from 'src/constant/enum/payment.enum.dto';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly changeRepository: ChangeRepository,
    private readonly transactionRepository: TransactionRepository,
  ) {}

  async listProduct(): Promise<ListProductResponse> {
    const allProducts = await this.productRepository.findAll();

    return {
      products: allProducts.map((product) => ({
        id: product.id,
        code: product.code,
        displayName: product.displayName,
        price: product.price,
        stockAmount: product.stockAmount,
      })),
    };
  }

  async addProduct(product: AddProductRequestBody): Promise<ProductModel> {
    const allProducts = await this.productRepository.findAll();

    const allProductCodes = allProducts.map((product) => product.code);
    if (allProductCodes.includes(product.code))
      throw new BadRequestException('Duplicate product code');

    return this.productRepository.create({ ...product, stockAmount: 0 });
  }

  async restockProduct(body: RestockProductRequestBody): Promise<ProductModel> {
    const { productId, stockAmount } = body;

    const product = await this.productRepository.findById(productId);
    if (!product)
      throw new NotFoundException(`Product id: ${productId} not found`);

    return this.productRepository.updateById(productId, {
      ...product,
      stockAmount,
    });
  }

  async buy(body: OrderRequestBody): Promise<OrderResponse> {
    const allProducts = await this.productRepository.findAll();
    if (!allProducts.length)
      throw new InternalServerErrorException('No product available');

    // Check product in order is exist
    const allProductIds = allProducts.map((product) => product.id);
    const orderProductIds = body.orders.map((order) => order.productId);
    if (orderProductIds.some((id) => !allProductIds.includes(id)))
      throw new BadRequestException('Some product are not found');

    // Check product in stock is enough
    body.orders.map((o) => {
      const targetProduct = allProducts.find((p) => p.id === o.productId);
      if (o.amount > targetProduct.stockAmount)
        throw new BadRequestException(
          `Have not enough product id: ${o.productId}`,
        );
    });

    const remainChange = await this.changeRepository.findAll();

    const totalRemainChange = sum(
      remainChange.map((change) => change.value * change.amount),
    );

    const totalChange = Number(body.paidDetail.total) - Number(body.totalPrice);

    // Check enough money to change
    if (totalRemainChange < totalChange)
      throw new BadRequestException('Not enough change');

    // Create empty object template for keep change data
    const changeWith: PaidWith[] = remainChange.map((change) => ({
      id: change.id,
      amount: 0,
    }));

    // Calculate change
    let totalChangeLeft = totalChange;
    remainChange.forEach((change) => {
      const targetChangeIndex = changeWith.findIndex((p) => p.id === change.id);

      // Continue change by this coin/bankNote while it still fit and have remain left
      while (
        totalChangeLeft >= change.value &&
        changeWith[targetChangeIndex].amount < change.amount
      ) {
        totalChangeLeft -= change.value;
        changeWith[targetChangeIndex].amount++;
      }
    });

    // เหลือเศษแปลว่าเงินทอนไม่พอดี ในเคสนี้จะให้เป็นซื้อไม่ได้
    if (totalChangeLeft !== 0) throw new BadRequestException('Can not change');

    // Update remain change
    const changeDiff = changeWith.filter((c) => c.amount);
    body.paidDetail.paidWith.map((pw) => {
      const targetChangeIndex = changeDiff.findIndex((c) => c.id === pw.id);
      if (targetChangeIndex > -1)
        changeDiff[targetChangeIndex].amount -= pw.amount;
      else changeDiff.push({ id: pw.id, amount: pw.amount * -1 });
    });
    Promise.all(
      changeDiff.map(async (p) => {
        const targetChangeIndex = remainChange.findIndex(
          (change) => Number(p.id) === change.id,
        );

        if (targetChangeIndex > -1) {
          await this.changeRepository.updateById(p.id, {
            ...remainChange[targetChangeIndex],
            amount: Number(remainChange[targetChangeIndex].amount) - p.amount,
          });
        }
      }),
    );

    // Update product stock amount
    Promise.all(
      body.orders.map(async (o) => {
        const targetProduct = allProducts.find((p) => p.id === o.productId);
        await this.productRepository.updateById(o.productId, {
          ...targetProduct,
          stockAmount: (targetProduct.stockAmount -= o.amount),
        });
      }),
    );

    // Save transaction
    await this.transactionRepository.create({
      products: body.orders,
      totalPrice: body.totalPrice,
      paymentMethod: PaymentMethod.Cash, // now support only cash
      paidDetail: body.paidDetail,
      changeDetail: {
        total: totalChange,
        paidWith: changeWith,
      },
    });

    return {
      orders: body.orders,
      changeDetail: {
        total: totalChange,
        paidWith: changeWith,
      },
    };
  }
}
