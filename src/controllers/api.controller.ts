import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { ProductModel } from '@repositories/models/product.model';
import { ControllerConstant } from 'src/constant/controller.constant';
import { ProductService } from 'src/services/product/product.service';
import {
  GetRemainChangeResponse,
  PatchAddChangeMoneyRequestBody,
  PatchRestockProductRequestBody,
  PostAddProductRequestBody,
  PostPurchaseProductRequestBody,
  PostPurchaseProductResponse,
} from './api.controller.dto';
import { ChangeService } from 'src/services/change/change.service';
import { ListProductResponse } from 'src/services/product/product.service.dto';
import { ChangeModel } from '@repositories/models/change.model';

@Controller('api')
export class ApiController {
  constructor(
    private readonly productService: ProductService,
    private readonly changeService: ChangeService,
  ) {}

  // product api
  @Get(ControllerConstant.Product)
  async getProducts(): Promise<ListProductResponse> {
    return this.productService.listProduct();
  }

  @Post(ControllerConstant.Product)
  async postAddProduct(
    @Body() requestBody: PostAddProductRequestBody,
  ): Promise<ProductModel> {
    return this.productService.addProduct(requestBody);
  }

  @Patch(ControllerConstant.Product)
  async patchRestockProduct(
    @Body() requestBody: PatchRestockProductRequestBody,
  ): Promise<ProductModel> {
    return this.productService.restockProduct(requestBody);
  }

  @Post(ControllerConstant.Purchase)
  async postPurchaseProductOrder(
    @Body() requestBody: PostPurchaseProductRequestBody,
  ): Promise<PostPurchaseProductResponse> {
    return this.productService.buy(requestBody);
  }

  // change api
  @Get(ControllerConstant.Change)
  async getRemainChange(): Promise<GetRemainChangeResponse> {
    return this.changeService.findRemainChange();
  }

  @Patch(ControllerConstant.Change)
  async patchAddChange(
    @Body() requestBody: PatchAddChangeMoneyRequestBody,
  ): Promise<ChangeModel> {
    return this.changeService.addChangeMoney(requestBody);
  }
}
