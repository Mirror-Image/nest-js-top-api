import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateReviewDto } from '../src/review/dto/create-review.dto';
import { Types, disconnect } from 'mongoose';
import { REVIEW_NOT_FOUND_ERROR } from '../src/review/review.constants';

const productId = new Types.ObjectId().toHexString();
const fakedProductId = new Types.ObjectId().toHexString();

const testDto: CreateReviewDto = {
	name: 'Test',
	title: 'Title',
	description: 'test description',
	rating: 5,
	productId,
};

describe('AppController (e2e)', () => {
	let app: INestApplication;
	let createdId: string;

	beforeAll(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('/review/create (POST) - success',(done) => {
		request(app.getHttpServer())
			.post('/review/create')
			.send(testDto)
			.expect(201)
			.then(({ body }: request.Response) => {
				createdId = body._id;
				expect(createdId).toBeDefined();
				done();
			});
	});

	it('/review/byProduct/:productId {GET} - success', (done) => {
		request(app.getHttpServer())
			.get(`/review/byProduct/${productId}`)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body.length).toBe(1);
				done();
			});
	});

	it('/review/byProduct/:productId {GET} - fail', (done) => {
		request(app.getHttpServer())
			.get(`/review/byProduct/${fakedProductId}`)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body.length).toBe(0);
				done();
			});
	});

	it('/review/:id {DELETE} - success', () => {
		return request(app.getHttpServer())
			.delete(`/review/${createdId}`)
			.expect(200);
	});

	it('/review/:id {DELETE} - fail', () => {
		return request(app.getHttpServer())
			.delete(`/review/${fakedProductId}`)
			.expect(404, {
				statusCode: 404,
				message: REVIEW_NOT_FOUND_ERROR,
			});
	});

	afterAll(() => {
		disconnect();
	});
});
