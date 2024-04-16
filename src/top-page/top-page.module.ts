import { Module } from '@nestjs/common';
import { TopPageController } from './top-page.controller';
import { KindagooseModule } from 'kindagoose';
import { TopPageModel } from './top-page.model';
import { TopPageService } from './top-page.service';

@Module({
  controllers: [TopPageController],
  imports: [KindagooseModule.forFeature([TopPageModel])],
  providers: [TopPageService]
})
export class TopPageModule {}
