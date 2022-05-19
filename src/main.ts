import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { CustomExceptionFilter } from './exception-filters/custom.exception.filter';

async function bootstrap() {
	const config = new DocumentBuilder()
		.setTitle('Movies')
		.setDescription('Nest movies pet project')
		.setVersion('1.0')
		.addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'access_token')
		.build();

	const app = await NestFactory.create(AppModule);
	app.setGlobalPrefix('api');

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document);

	app.useGlobalFilters(new CustomExceptionFilter());
	await app.listen(3000);
}
bootstrap();
