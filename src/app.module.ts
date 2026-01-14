import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ProductsModule,
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: ((configService:ConfigService)=>({
        type: 'sqlite',
        autoLoadEntities: true,
        database: 'database.sqlite',
        synchronize: false
      }))
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
