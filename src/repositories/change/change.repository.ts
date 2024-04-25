import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BaseModel } from '@repositories/models/base.model';
import { ChangeModel } from '@repositories/models/change.model';
import { Identifier } from 'sequelize';

@Injectable()
export class ChangeRepository {
  constructor(
    @InjectModel(ChangeModel)
    private changeModel: typeof ChangeModel,
  ) {}

  async findAll(): Promise<ChangeModel[]> {
    return this.changeModel.findAll({ order: [['id', 'DESC']] });
  }

  async findById(identifier: Identifier): Promise<ChangeModel | null> {
    const change = await this.changeModel.findByPk(identifier);

    if (change == null) {
      return null;
    }

    return change;
  }

  async updateById(
    identifier: Identifier,
    data: Partial<ChangeModel>,
  ): Promise<ChangeModel | null> {
    const change = await this.changeModel.findByPk(identifier);

    if (change == null) {
      return null;
    }

    change.changed('updatedAt', true);

    await change.update(data as BaseModel);

    return change;
  }
}
