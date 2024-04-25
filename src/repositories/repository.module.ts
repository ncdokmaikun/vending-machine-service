import { Module } from '@nestjs/common';
import { ProductRepository } from './product/product.repository';
import models from './models';
import { SequelizeModule } from '@nestjs/sequelize';
import { ChangeRepository } from './change/change.repository';
import { TransactionRepository } from './transaction/transaction.repository';

const repositories = [
  ProductRepository,
  ChangeRepository,
  TransactionRepository,
];

@Module({
  imports: [SequelizeModule.forFeature(models)],
  providers: repositories,
  exports: repositories,
})
export class RepositoryModule {}
