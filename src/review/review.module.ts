import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { KindagooseModule } from 'kindagoose';
import { ReviewModel } from './review.model';
import { ReviewService } from './review.service';
import { TelegramModule } from '../telegram/telegram.module';

@Module({
  controllers: [ReviewController],
  imports: [
	KindagooseModule.forFeature([ReviewModel]),
	TelegramModule,
  ],
  providers: [ReviewService]
})
export class ReviewModule {}
