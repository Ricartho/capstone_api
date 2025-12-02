import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { parseStringPromise } from 'xml2js';

@Injectable()
export class OwlLifeFeedService {
    private FEED_URL = 'https://owllife.kennesaw.edu/events.rss';

    async fetchOwlLifeEvents() {
        const { data: xml } =  await axios.get(this.FEED_URL);

        const parsed = await parseStringPromise(xml, { explicitArray: false});

        const items = parsed.rss.channel.item;

        //Make it an array
        return Array.isArray(items) ? items : [items];
    }
}