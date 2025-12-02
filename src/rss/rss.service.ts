import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OwlLifeFeedService } from'./owllifefeed.service';
import { Event } from '../event/entity/event.schema';
import { create } from 'xmlbuilder2';

interface RssItem {
    title: string;
    link: string;
    pubDate: string;
    description?: string;
}

@Injectable()
export class RssService {
    constructor(
        @InjectModel(Event.name) private eventModel: Model<Event>,
        private owlLifeService: OwlLifeFeedService,
    ) {}

    async mergeFeeds(): Promise<string> {
        //Get mongodb events
        const localEvents = await this.eventModel.find().lean();

        const localRssItems = localEvents.map(event => ({
            title: event.title,
            link: `http://localhost:3000/api/events/${event._id}`,
            pubDate: new Date(event.eventDate).toUTCString(),
        }));

        //Get rss events
        const externalEvents = await this.owlLifeService.fetchOwlLifeEvents();

        const externalRssItems : RssItem[] = externalEvents.map(item => ({
            title: item.title,
            description: item.description,
            link: item.link,
            pubDate: item.pubDate,
        }));

        //Combine lists
        const mergedItems : RssItem[] =  [...localRssItems, ...externalRssItems];

        //Create rss XML
        const rss = create({ version: '1.0'})
            .ele('rss', { version: '2.0'})
            .ele('channel')
            .ele('title').txt('Merged Events').up()
            .ele('description').txt('Combined events').up()
            .ele('link').txt('http://localhost:3000/api').up();

            mergedItems.forEach(item => {
                const event = rss.ele('item');
                event.ele('title').txt(item.title);
                event.ele('link').txt(item.link);
                event.ele('pubDate').txt(item.pubDate);

                if (item.description){
                    event.ele('description').txt(item.description);

                }
            });

            const xmlOutput = rss.end({ prettyPrint: true});

            return xmlOutput;
    }
}