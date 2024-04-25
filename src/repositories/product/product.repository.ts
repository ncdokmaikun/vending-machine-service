import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BaseModel } from '@repositories/models/base.model';
import { ProductModel } from '@repositories/models/product.model';
import { Identifier } from 'sequelize';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectModel(ProductModel)
    private productModel: typeof ProductModel,
  ) {}

  async findAll(): Promise<ProductModel[]> {
    return this.productModel.findAll({ order: [['id', 'ASC']] });
  }

  async create(data: Partial<ProductModel>): Promise<ProductModel> {
    return await this.productModel.create(data as BaseModel);
  }

  async findById(identifier: Identifier): Promise<ProductModel | null> {
    const product = await this.productModel.findByPk(identifier);

    if (product == null) {
      return null;
    }

    return product;
  }

  async updateById(
    identifier: Identifier,
    data: Partial<ProductModel>,
  ): Promise<ProductModel | null> {
    const product = await this.productModel.findByPk(identifier);

    if (product == null) {
      return null;
    }

    product.changed('updatedAt', true);

    await product.update(data as BaseModel);

    return product;
  }
}
