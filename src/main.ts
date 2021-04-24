import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { MainModule } from './main.module';
import { ServiceLogger } from './logger/logger.service';

async function bootstrap() {
    const app = await NestFactory.create(MainModule, {
        logger: false,
        cors: true
    });

    const config = app.get<ConfigService>(ConfigService);

    app.useLogger(new ServiceLogger(config));

    const logger = await app.resolve<ServiceLogger>(ServiceLogger);

    const context = config.get<string>('api.context');

    if (context) {
        logger.info(`API context: ${context}`);
        app.setGlobalPrefix(context);
    }

    // Swagger
    const options = new DocumentBuilder()
        .setTitle('DARE Node.js API REST assessment')
        .setDescription('Middleware for Insurance API')
        .addBearerAuth()
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup(`${context ? context + '/' : ''}api`, app, document);

    await app.listen(config.get<number>('api.port'));
    logger.info(`Server listening on port: ${config.get<number>('api.port')}`);
}

bootstrap();
