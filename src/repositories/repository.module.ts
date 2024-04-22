import { Module } from '@nestjs/common';
import { ProductRepository } from './product/product.repository';
import models from './models';
import { SequelizeModule } from '@nestjs/sequelize';

const repositories = [ProductRepository];

@Module({
  imports: [SequelizeModule.forFeature(models)],
  providers: [...repositories],
  exports: repositories,
})
export class RepositoryModule {}
