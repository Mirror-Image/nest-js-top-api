import { TopLevelCategoryEnum } from '../top-page.model';
import { IsEnum } from 'class-validator';

export class FindTopPageDto {
	@IsEnum(TopLevelCategoryEnum)
	firstCategory: TopLevelCategoryEnum;
}
