import { ConfigService } from '@nestjs/config';

export const getMongoConfig = (configService: ConfigService) => {
	return {
		uri: getMongoString(configService),
		...getMongoOptions()
	};
};

const getMongoString = (configService: ConfigService) => {
	const login = configService.get('MONGO_LOGIN');
	const pass = configService.get('MONGO_PASSWORD');
	const host = configService.get('MONGO_HOST');
	const port = configService.get('MONGO_PORT');
	const defaultAuthDB = configService.get('MONGO_AUTHDATABASE');

	return `mongodb://${login}:${pass}@${host}:${port}/${defaultAuthDB}`;
};

const getMongoOptions = () => ({
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
