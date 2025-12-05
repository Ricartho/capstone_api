import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { parseStringPromise } from 'xml2js';

//npm install xml2js xmlbuilder2 axios

@Injectable()
export class OwlLifeFeedService {
    private FEED_URL = 'https://owllife.kennesaw.edu/events.rss';

    //Get event ID
    extractId(link: string): string {
        if(!link) return '';

        const cleanLink = link.split('?')[0];

        const match = cleanLink.match(/(\d+)(?!.*\d)/);
        return match ? match[1] : '';
    }

    async fetchOwlLifeEvents() {
        const { data: xml } =  await axios.get(this.FEED_URL);

        const parsed = await parseStringPromise(xml, { explicitArray: false});

        const items = parsed.rss.channel.item;

        //Make it an array
        return Array.isArray(items) ? items : [items];
    }
}