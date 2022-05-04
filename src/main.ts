import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomExceptionFilter } from './exception-filters/custom.exception.filter';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.setGlobalPrefix('api');
	app.useGlobalFilters(new CustomExceptionFilter());
	await app.listen(3000);
}
bootstrap();
