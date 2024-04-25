import {
  AddChangeRequestBody,
  FindRemainChangeResponse,
} from 'src/services/change/change.service.dto';
import {
  AddProductRequestBody,
  ListProductResponse,
  OrderRequestBody,
  OrderResponse,
  RestockProductRequestBody,
} from 'src/services/product/product.service.dto';

// Product type
export type GetListProduct = ListProductResponse;

export type PostAddProductRequestBody = AddProductRequestBody;

export type PatchRestockProductRequestBody = RestockProductRequestBody;

export type PostPurchaseProductRequestBody = OrderRequestBody;
export type PostPurchaseProductResponse = OrderResponse;

// Change type
export type GetRemainChangeResponse = FindRemainChangeResponse;

export type PatchAddChangeMoneyRequestBody = AddChangeRequestBody;
