import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { KindagooseModule } from 'kindagoose';
import { AuthModel } from './auth.model';

@Module({
  controllers: [AuthController],
  imports: [KindagooseModule.forFeature([AuthModel])],
})
export class AuthModule {}
