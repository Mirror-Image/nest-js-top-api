import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { KindagooseModule } from 'kindagoose';
import { ProductModel } from './product.model';

@Module({
  controllers: [ProductController],
  imports: [KindagooseModule.forFeature([ProductModel])],
})
export class ProductModule {}
