import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ProductModel } from '@repositories/models/product.model';
import { ProductRepository } from '@repositories/product/product.repository';
import {
  AddProductRequestBody,
  OrderRequestBody,
  OrderResponse,
} from './product.service.dto';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async findAllProducts(): Promise<ProductModel[]> {
    return this.productRepository.findAll();
  }

  async addProduct(product: AddProductRequestBody): Promise<ProductModel> {
    const allProducts = await this.productRepository.findAll();
    if (!allProducts.length)
      throw new InternalServerErrorException('No product available');

    const allProductCodes = allProducts.map((product) => product.code);
    if (allProductCodes.includes(product.code))
      throw new BadRequestException('Duplicate product code');

    return this.productRepository.createProduct(product);
  }

  async buy(body: OrderRequestBody): Promise<OrderResponse> {
    const allProducts = await this.productRepository.findAll();
    if (!allProducts.length)
      throw new InternalServerErrorException('No product available');

    const allProductIds = allProducts.map((product) => product.id);
    const orderProductIds = body.orders.map((order) => order.productId);
    if (orderProductIds.some((id) => !allProductIds.includes(id)))
      throw new BadRequestException('Some product not found');

    return {
      orders: [],
      changeDetail: {
        total: 0,
        paidWith: [],
      },
    };
  }
}
