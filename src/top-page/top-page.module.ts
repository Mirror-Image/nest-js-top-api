import { Module } from '@nestjs/common';
import { TopPageController } from './top-page.controller';
import { KindagooseModule } from 'kindagoose';
import { TopPageModel } from './top-page.model';

@Module({
  controllers: [TopPageController],
  imports: [KindagooseModule.forFeature([TopPageModel])]
})
export class TopPageModule {}
