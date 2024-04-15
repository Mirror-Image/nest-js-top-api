import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { KindagooseModule } from 'kindagoose';
import { UserModel } from './user.model';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJWTConfig } from '../configs/jwt.config';
import { Passthrough } from '@typegoose/typegoose';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  controllers: [AuthController],
  imports: [
	  KindagooseModule.forFeature([UserModel]),
	  ConfigModule,
	  JwtModule.registerAsync({
		  imports: [ConfigModule],
		  inject: [ConfigService],
		  useFactory: getJWTConfig,
	  }),
	  Passthrough,
  ],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
