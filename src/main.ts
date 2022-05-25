import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { JwtAuthGuard, RolesGuard } from './auth/guards';
import { CustomExceptionFilter } from './exception-filters/custom.exception.filter';

async function bootstrap(): Promise<void> {
	const config = new DocumentBuilder()
		.setTitle('Movies')
		.setDescription('Nest movies pet project')
		.addSecurity('admin_token', {
			type: 'http',
			bearerFormat: 'JWT',
			scheme: 'bearer',
			description: 'You need to be logged in as admin to use some of the routes!',
		})
		.setVersion('1.0')
		.addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'access_token')
		.build();

	const app = await NestFactory.create(AppModule);
	app.setGlobalPrefix('api');
	app.useGlobalGuards(new JwtAuthGuard());
	app.useGlobalGuards(new RolesGuard());

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document);

	app.useGlobalFilters(new CustomExceptionFilter());
	await app.listen(3000);
}
bootstrap();
