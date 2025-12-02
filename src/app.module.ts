import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Appconfig } from './config/app-config.service';
import {validate} from './config/env.validation';
import { DatabaseModule } from './database/database.module';
import { userModule } from './user/user.module';
import { eventModule } from './event/event.module';
import { ReportModule } from './report/report.module';
import { RssModule } from './rss/rss.module'


@Module({
  imports: [ ConfigModule.forRoot({
          envFilePath: '.env',
          validate
  }),
  DatabaseModule,
  userModule,
  eventModule,
  ReportModule,
  RssModule,
],
  controllers: [AppController],
  providers: [AppService,Appconfig],
})
export class AppModule {}
