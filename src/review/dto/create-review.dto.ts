import { IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateReviewDto {
	@IsString()
	name: string;

	@IsString()
	title: string;

	@IsString()
	description: string;

	@Max(5, { message: 'Rating can\'t be more than $constraint1' })
	@Min(1, { message: 'Rating can\'t be less than $constraint1' })
	@IsNumber()
	rating: number;

	@IsString()
	productId: string;
}
