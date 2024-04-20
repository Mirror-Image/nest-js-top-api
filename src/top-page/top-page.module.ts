import { Module } from '@nestjs/common';
import { TopPageController } from './top-page.controller';
import { KindagooseModule } from 'kindagoose';
import { TopPageModel } from './top-page.model';
import { TopPageService } from './top-page.service';
import { HhModule } from '../hh/hh.module';

@Module({
  controllers: [TopPageController],
  imports: [
		KindagooseModule.forFeature([TopPageModel]),
		HhModule,
  ],
  providers: [TopPageService],
  exports: [TopPageService],
})
export class TopPageModule {}
