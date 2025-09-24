import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Appconfig } from './config/app-config.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';


async function bootstrap() {

  const app = await NestFactory.create(AppModule);

    app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  
  const configService = app.get(Appconfig);


  const config = new DocumentBuilder()
    .setTitle('Capstone Project')
    .setDescription('API description for Capstone Project')
    .addBearerAuth()
    .setVersion('1.0')
    .build();

    const doc = SwaggerModule.createDocument(app,config);
    SwaggerModule.setup('spec',app, doc);

  // await app.listen(process.env.PORT ?? 3000);
  await app.listen(configService.appPort);

  Logger.log(
    `App is running on http://localhost:${configService.appPort}/${globalPrefix}`
  );
    Logger.log(
    `Swagger is available on http://localhost:${configService.appPort}/spec`,
  );
}

bootstrap();
