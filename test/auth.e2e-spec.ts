import { AuthDto } from '../src/auth/dto/auth.dto';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { disconnect } from 'mongoose';
import * as request from 'supertest';
import { USER_NOT_FOUND_ERROR, WRONG_PASSWORD_ERROR } from '../src/auth/auth.constants';

const loginDto: AuthDto = {
	login: 'test@mail.com',
	password: '123456789!',
};

describe('AuthController (e2e)', () => {
	let app: INestApplication;

	beforeAll(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('/auth/login (POST) - success',(done) => {
		request(app.getHttpServer())
			.post('/auth/login')
			.send(loginDto)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body.access_token).toBeDefined();
				done();
			});
	});

	it('/auth/login (POST) - fail password',async () => {
		return request(app.getHttpServer())
			.post('/auth/login')
			.send({ ...loginDto, password: '000' })
			.expect(401, {
				statusCode: 401,
				message: WRONG_PASSWORD_ERROR,
				error: 'Unauthorized',
			});
	});

	it('/auth/login (POST) - fail login', async () => {
		return request(app.getHttpServer())
			.post('/auth/login')
			.send({ ...loginDto, login: 'fake@mail.com' })
			.expect(401, {
				statusCode: 401,
				message: USER_NOT_FOUND_ERROR,
				error: 'Unauthorized',
			});
	});

	afterAll(() => {
		disconnect();
	});
});
