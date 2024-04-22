import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { BaseModel } from './base.model';
import {
  Currency,
  MoneyCode,
  MoneyType,
} from 'src/constant/enum/payment.enum.dto';

@Table({
  tableName: 'change',
})
export class ChangeModel extends Model<BaseModel> {
  @Column({
    type: DataType.STRING,
  })
  displayName!: string;

  @Column({
    type: DataType.STRING,
  })
  code!: MoneyCode;

  @Column({
    type: DataType.STRING,
  })
  type!: MoneyType;

  @Column({
    type: DataType.STRING,
    defaultValue: () => Currency.Thb,
  })
  currency!: string;

  @Column({
    type: DataType.NUMBER,
  })
  value!: number;

  @Column({
    type: DataType.NUMBER,
  })
  amount!: number;
}
