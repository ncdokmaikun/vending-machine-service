import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BaseModel } from '@repositories/models/base.model';
import { TransactionModel } from '@repositories/models/transaction.model';

@Injectable()
export class TransactionRepository {
  constructor(
    @InjectModel(TransactionModel)
    private transactionModel: typeof TransactionModel,
  ) {}

  async create(data: Partial<TransactionModel>): Promise<TransactionModel> {
    return await this.transactionModel.create(data as BaseModel);
  }
}
