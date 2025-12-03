import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Appconfig } from './config/app-config.service';
import {validate} from './config/env.validation';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { EventModule } from './event/event.module';
import { ReportModule } from './report/report.module';
import { RssModule } from './rss/rss.module';


@Module({
  imports: [ ConfigModule.forRoot({
          envFilePath: '.env',
          validate
  }),
  DatabaseModule,
  UserModule,
  EventModule,
  ReportModule,
  RssModule,
],
  providers: [Appconfig],
})
export class AppModule {}
