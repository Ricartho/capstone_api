import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Appconfig } from './config/app-config.service';
import {validate} from './config/env.validation';
import { DatabaseModule } from './database/database.module';
import { userModule } from './user/user.module';


@Module({
  imports: [ ConfigModule.forRoot({
          envFilePath: '.env',
          validate
  }),
  DatabaseModule,
  userModule,
],
  providers: [Appconfig],
})
export class AppModule {}
