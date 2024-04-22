import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProductModel } from '@repositories/models/product.model';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectModel(ProductModel)
    private productModel: typeof ProductModel,
  ) {}

  async findAll(): Promise<ProductModel[]> {
    return this.productModel.findAll();
  }

  async createProduct(data: Partial<ProductModel>): Promise<ProductModel> {
    return await this.productModel.create(data as any);
  }
}
