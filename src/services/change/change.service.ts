import { Injectable, NotFoundException } from '@nestjs/common';
import { ChangeRepository } from '@repositories/change/change.repository';
import {
  AddChangeRequestBody,
  FindRemainChangeResponse,
} from './change.service.dto';
import { sum } from 'lodash';
import { ChangeModel } from '@repositories/models/change.model';

@Injectable()
export class ChangeService {
  constructor(private readonly changeRepository: ChangeRepository) {}

  async findRemainChange(): Promise<FindRemainChangeResponse> {
    const allChange = await this.changeRepository.findAll();

    return {
      totalValue: sum(allChange.map((change) => change.value * change.amount)),
      remainChanges: allChange.map((change) => ({
        id: change.id,
        displayName: change.displayName,
        code: change.code,
        type: change.type,
        value: change.value,
        amount: change.amount,
      })),
    };
  }

  async addChangeMoney(body: AddChangeRequestBody): Promise<ChangeModel> {
    const { changeId, amount } = body;

    const product = await this.changeRepository.findById(changeId);
    if (!product)
      throw new NotFoundException(`Change id: ${changeId} not found`);

    return this.changeRepository.updateById(changeId, {
      ...product,
      amount,
    });
  }
}
