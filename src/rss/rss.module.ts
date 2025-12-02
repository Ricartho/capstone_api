import { Module } from '@nestjs/common';
import { RssController } from './rss.controller';
import { RssService } from './rss.service';
import { OwlLifeFeedService } from './owllifefeed.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Event, EventSchema } from '../event/entity/event.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
  ],
  controllers: [RssController],
  providers: [RssService, OwlLifeFeedService],
})
export class RssModule {}
