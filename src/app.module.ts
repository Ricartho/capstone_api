import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Appconfig } from './config/app-config.service';
import {validate} from './config/env.validation';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { EventModule } from './event/event.module';
import { ProgressModule } from './progress/progress.module';


@Module({
  imports: [ ConfigModule.forRoot({
          envFilePath: '.env',
          validate
  }),
  DatabaseModule,
  UserModule,
  EventModule,
  ProgressModule,
],
  providers: [Appconfig],
})
export class AppModule {}
