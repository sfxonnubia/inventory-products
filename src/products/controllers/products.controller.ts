import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { CreateProductDto, QueryDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async createProduct(@Body() productDto:CreateProductDto){
  return this.productsService.createProduct(productDto)
  }

  @Get('all')
  async findAllProducts(@Query() query:QueryDto){
    return this.productsService.findAllProducts(query);
  }

  @Get(':id')
  async findProductById(@Param('id', ParseIntPipe) id: number){
    return this.productsService.findProductById(id);
  }

  @Patch(':id')
  async updateProducts(@Param('id', ParseIntPipe) id: number,@Body() dto:UpdateProductDto){
    return this.productsService.updateProducts(id, dto);
  }

  @Delete(':id')
  async deleteProduct(@Param('id', ParseIntPipe) id: number){
    return this.productsService.deleteProduct(id)
  }
}
