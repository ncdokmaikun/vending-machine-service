import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductModel } from '@repositories/models/product.model';
import { ControllerConstant } from 'src/constant/controller.constant';
import { ProductService } from 'src/services/product/product.service';
import { PostAddProductRequestBody } from './api.controller.dto';

@Controller('api')
export class ApiController {
  constructor(private readonly productService: ProductService) {}

  @Get(ControllerConstant.Product)
  async getProducts(): Promise<ProductModel[]> {
    return this.productService.findAllProducts();
  }

  @Post(ControllerConstant.Product)
  async addProducts(
    @Body() requestBody: PostAddProductRequestBody,
  ): Promise<ProductModel> {
    return this.productService.addProduct(requestBody);
  }
}
