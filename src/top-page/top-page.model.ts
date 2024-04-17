import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { prop, index } from '@typegoose/typegoose';

export enum TopLevelCategoryEnum {
	Courses,
	Services,
	Books,
	Products,
}

export class HHData {
	@prop()
	count: number;

	@prop()
	juniorSalary: number;

	@prop()
	middleSalary: number;

	@prop()
	seniorSalary: number;
}

export class TopPageAdvantage {
	@prop()
	title: string;

	@prop()
	description: string;
}

export interface TopPageModel extends Base {}

@index({ '$**': 'text' })
export class TopPageModel extends TimeStamps {
	@prop({ enum: TopLevelCategoryEnum })
	firstCategory: TopLevelCategoryEnum;

	@prop()
	secondCategory: string;

	@prop({ unique: true })
	alias: string;

	@prop()
	title: string;

	@prop()
	metaTitle: string;

	@prop()
	metaDescription: string;

	@prop()
	category: string;

	@prop({ type: () => HHData })
	hh?: HHData;

	@prop({ type: () => [TopPageAdvantage] })
	advantages: TopPageAdvantage[];

	@prop()
	seoText: string;

	@prop()
	tagsTitle: string;

	@prop({ type: () => [String] })
	tags: string[];

}
