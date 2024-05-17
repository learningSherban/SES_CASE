import { App } from './app';
import { INVERSIFY_TYPES } from './constants/inversify.types';
import { appDIContainer } from './ioc';

async function bootstrap() {
	const app = appDIContainer.get<App>(INVERSIFY_TYPES.Application);
	await app.init();
}

bootstrap();