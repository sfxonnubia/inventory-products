import { BadRequestException, ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Between, LessThanOrEqual, MoreThan, MoreThanOrEqual, Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto, QueryDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';


@Injectable()
export class ProductsService {

  private readonly logger = new Logger(ProductsService.name);

  constructor(

    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>
  ) { }

  async createProduct(dto: CreateProductDto) {

    if (dto.price <= 0) {
      throw new BadRequestException('Price can not be 0 or negative');
    }

    try {

      const product = this.productRepo.create(dto);
      await this.productRepo.save(product);
      this.logger.log(`Product created successfully`);

      return product;
    } catch (error) {
      this.logger.error(`Failed to create product: ${error.message}`);
      throw new BadRequestException('Failed to create product');
    }
  }

  async findAllProducts(query:QueryDto) {
    const { limit = 10, page = 0, minPrice, maxPrice } = query

    const where: any = {};

    if(minPrice && maxPrice){
      where.price = Between(minPrice, maxPrice);
    }else if(minPrice){
      where.price = MoreThanOrEqual(minPrice);
    }else if(maxPrice){
      where.price = LessThanOrEqual(maxPrice);
    }

    try {
      const [products, total] = await this.productRepo.findAndCount({
      where,  
      skip: page * limit,
      take: limit,
      order: {createdAt: 'DESC'}
      });
     
      return {
        data: products,
        count: total
      };

    } catch (error) {
      this.logger.error(`Failed to fetch product: ${error.message}`);
      throw new BadRequestException('Failed to fetch Products')
    }
  }

  async findProductById(id: number) {
    const product = await this.productRepo.findOne({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async updateProducts(id: number, dto: UpdateProductDto) {
    const product = await this.productRepo.findOne({
      where: {
        id: id
      }
    })
    if(!product) throw new NotFoundException('Product not found');

    const updatedProduct = this.productRepo.merge(product, dto);
    await this.productRepo.save(updatedProduct)
    return updatedProduct;
  }

  async deleteProduct(id: number){
     const product = await this.productRepo.findOne({
      where: {
        id: id
      }
    })
     if(!product) throw new NotFoundException('Product not found');

     await this.productRepo.delete(id);
     return {
      message: 'The product was succesfully deleted'
     }
  }
}
