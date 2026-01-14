import { Type } from "@nestjs/class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Min } from "@nestjs/class-validator";

export class CreateProductDto {


    @IsString()
    name: string;
    @IsOptional()
    @IsString()
    description?: string;
    @IsNumber()
    @Min(1)
    price: number;
    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    quantity: number;
}

export class QueryDto {
    @IsOptional()
    @Type(() => Number)
    limit?: number;

    @IsOptional()
    @Type(() => Number)
    page?: number;

    @IsOptional()
    @IsPositive()
    @Type(() => Number)
    minPrice?: number;

    @IsOptional()
    @IsPositive()
    @Type(() => Number)
    maxPrice?: number;
}
