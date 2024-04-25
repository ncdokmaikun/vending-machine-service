import { Order, PaymentDetail } from '@repositories/models/transaction.model';

export interface ListProductResponse {
  products: Array<{
    id: string;
    displayName: string;
    code: string;
    price: number;
    stockAmount: number;
  }>;
}

export interface AddProductRequestBody {
  displayName: string;
  code: string;
  type: string;
  price: number;
}

export interface RestockProductRequestBody {
  productId: string;
  stockAmount: number;
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
