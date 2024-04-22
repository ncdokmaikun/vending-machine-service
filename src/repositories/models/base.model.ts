import {
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
} from 'sequelize-typescript';

export class BaseModel extends Model<BaseModel> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.BIGINT,
    autoIncrement: true,
  })
  id!: number;

  @Column({
    type: DataType.DATE,
    defaultValue: () => new Date().toISOString(),
  })
  createdAt!: Date;

  @Column({
    type: DataType.DATE,
    defaultValue: () => new Date().toISOString(),
  })
  updatedAt!: Date;

  @Column({
    type: DataType.DATE,
  })
  deletedAt!: Date;
}
