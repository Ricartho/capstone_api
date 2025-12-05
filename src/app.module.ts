import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Appconfig } from './config/app-config.service';
import {validate} from './config/env.validation';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { EventModule } from './event/event.module';
import { ProgressModule } from './progress/progress.module';
import { MyMailerModule } from './mailer/mailer.module';
import { MilestoneModule } from './milestone/milestone.module';
import { CategoryModule } from './category/category.module';
import { ReportModule } from './report/report.module';


@Module({
  imports: [ ConfigModule.forRoot({
          envFilePath: '.env',
          validate
  }),
  
  MyMailerModule,
  DatabaseModule,
  UserModule,
  EventModule,
  ProgressModule,
  MilestoneModule,
  CategoryModule,
  ReportModule

],
  providers: [Appconfig],
})
export class AppModule {}
