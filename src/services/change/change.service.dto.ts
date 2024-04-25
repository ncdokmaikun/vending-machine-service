import { MoneyType } from 'src/constant/enum/payment.enum.dto';

export interface FindRemainChangeResponse {
  totalValue: number;
  remainChanges: RemainChange[];
}

export interface RemainChange {
  id: string;
  displayName: string;
  code: string;
  type: MoneyType;
  value: number;
  amount: number;
}

export interface AddChangeRequestBody {
  changeId: string;
  amount: number;
}
