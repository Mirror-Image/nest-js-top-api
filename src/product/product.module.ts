import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { KindagooseModule } from 'kindagoose';
import { ProductModel } from './product.model';
import { ProductService } from './product.service';

@Module({
  controllers: [ProductController],
  imports: [KindagooseModule.forFeature([ProductModel])],
  providers: [ProductService],
})
export class ProductModule {}
