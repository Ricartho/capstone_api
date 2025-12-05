import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { Event, EventSchema }  from '../event/entity/event.schema';
import { RssModule } from '../rss/rss.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
    RssModule,
  ],
  controllers: [ReportController],
  providers: [ReportService]
})
export class ReportModule {}
