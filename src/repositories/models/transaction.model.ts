import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { BaseModel } from './base.model';
import { PaymentMethod } from 'src/constant/enum/payment.enum.dto';

@Table({
  tableName: 'transaction',
})
export class TransactionModel extends Model<BaseModel> {
  @Column({
    type: DataType.ARRAY(DataType.JSONB),
  })
  products!: Order[];

  @Column({
    type: DataType.INTEGER,
  })
  totalPrice!: number;

  @Column({
    type: DataType.STRING,
    defaultValue: () => PaymentMethod.Cash,
  })
  paymentMethod!: PaymentMethod;

  @Column({
    type: DataType.JSONB,
  })
  paidDetail!: PaymentDetail;

  @Column({
    type: DataType.JSONB,
  })
  changeDetail!: PaymentDetail;
}

export interface Order {
  productId: string;
  amount: number;
}

export interface PaymentDetail {
  total: number;
  paidWith: PaidWith[];
}

export interface PaidWith {
  id: string;
  amount: number;
}
