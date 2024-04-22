import { Order, PaymentDetail } from '@repositories/models/transaction.model';

export interface AddProductRequestBody {
  displayName: string;
  code: string;
  type: string;
  price: number;
}

export interface OrderRequestBody {
  orders: Order[];
  totalPrice: number;
  paidDetail: PaymentDetail;
}

export interface OrderResponse {
  orders: Order[];
  changeDetail: PaymentDetail;
}
