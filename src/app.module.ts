import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Appconfig } from './config/app-config.service';
import {validate} from './config/env.validation';
import { DatabaseModule } from './database/database.module';
import { userModule } from './user/user.module';
import { eventModule } from './event/event.module';
import { MilestoneModule } from './milestone/milestone.module';


@Module({
  imports: [ ConfigModule.forRoot({
          envFilePath: '.env',
          validate
  }),
  DatabaseModule,
  userModule,
  eventModule,
  MilestoneModule
],
  providers: [Appconfig],
})
export class AppModule {}
