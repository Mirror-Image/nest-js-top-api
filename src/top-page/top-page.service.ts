import { Injectable } from '@nestjs/common';
import { InjectModel } from 'kindagoose';
import { TopLevelCategoryEnum, TopPageModel } from './top-page.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { subDays } from 'date-fns';
import { Types } from 'mongoose';

@Injectable()
export class TopPageService {
	constructor(
		@InjectModel(TopPageModel)
		private readonly topPageModel: ModelType<TopPageModel>,
	) {}

	async create(dto: CreateTopPageDto) {
		return this.topPageModel.create(dto);
	}

	async findById(id: string) {
		return this.topPageModel.findById(id).exec();
	}

	async findByAlias(alias: string) {
		return this.topPageModel.findOne({ alias }).exec();
	}

	async findAll() {
		return this.topPageModel.find({}).exec();
	}

	async findByCategory(firstCategory: TopLevelCategoryEnum) {
		return this.topPageModel
			.aggregate()
			.match({ firstCategory })
			.group({
				_id: { secondCategory: '$secondCategory' },
				pages: { $push: { alias: '$alias', title: '$title' }},
			})
			.exec();
	}

	async findByText(text: string) {
		return this.topPageModel.find({
			$text: {
				$search: text,
				$caseSensitive: false,
			}
		}).exec();
	}

	async deleteById(id: string) {
		return this.topPageModel.findByIdAndDelete(id).exec();
	}

	async updateById(id: string | Types.ObjectId, dto: CreateTopPageDto) {
		return this.topPageModel.findByIdAndUpdate(id, dto, { new: true }).exec();
	}

	async findForHHUpdate(date: Date) {
		return this.topPageModel.find({
			firstCategory: 0,
			$or: [
				{ 'hh.updatedAt': { $lt: subDays(date, 1) }},
				{ 'hh.updatedAt': { $exists: false }},
			],
		}).exec();
	}
}
