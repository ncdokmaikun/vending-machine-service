import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { BaseModel } from './base.model';

@Table({
  tableName: 'product',
})
export class ProductModel extends Model<BaseModel> {
  @Column({
    type: DataType.STRING,
  })
  displayName!: string;

  @Column({
    type: DataType.STRING,
  })
  code!: string;

  @Column({
    type: DataType.STRING,
  })
  type!: string;

  @Column({
    type: DataType.NUMBER,
  })
  price!: number;

  @Column({
    type: DataType.NUMBER,
  })
  stockAmount!: number;
}
