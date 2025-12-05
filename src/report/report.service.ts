import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event } from '../event/entity/event.schema';
import { OwlLifeFeedService } from '../rss/owllifefeed.service';

@Injectable()
export class ReportService {
    constructor(
        @InjectModel(Event.name) private eventModel: Model<Event>,
        private readonly owlLifeService: OwlLifeFeedService,
    ) {}

    //Mongo or Owllife event
    private isMongoId(id: string): boolean {
        return /^[0-9a-fA-F]{24}$/.test(id);
    }

    async generateAllReports(): Promise<Buffer> {
        //Mock data
        // const events = [ {
        //     id: 693156512253053250806635,
        //     title: 'KSU Career Fair',
        //     eventDate: '10-27-2025',
        //     reservationCount: 100,
        //     location: 'Student Success Center',
        // },
        // {
        //     id: 693156512253053250806636,
        //     title: 'C-Day',
        //     eventDate: '11-10-2025',
        //     reservationCount: 100,
        //     location: 'Student Success Center',
        // },
        // ];

        //Fetch data from MongoDB
        const events = await this.eventModel.find().exec();

        if (!events || events.length === 0 ){
            throw new NotFoundException('No events found');
        }

        //Create report
        const header = 'All Events\n';
        const reports = events
        .map((event,index) => {
            return `
            #${index + 1}
            EventID: ${event.id}
            Title: ${event.title}
            Date: ${event.eventDate}
            Location: ${event.location}
            Reservation Count: ${event.reservationCount}
            ------------------------`;
        })
        .join('\n\n');

        const fullReport = header + reports + '\n';
        return Buffer.from(fullReport, 'utf-8');
        //http://localhost:3000/api/report/download/all
    }

    async generateUnifiedReport(id: string): Promise<Buffer> {
        if (this.isMongoId(id)) {
            return this.generateReport(id); //From local monogodb
        }

        return this.generateExternalReport(id); //From owllife
    }

    async generateExternalReport(eventId: string): Promise<Buffer> {
        const events = await this.owlLifeService.fetchOwlLifeEvents();
        
       events.forEach(e => {
        const id = this.owlLifeService.extractId(e.link);
        console.log("Found event:", id, " | Title: ", e.title);
       });
       
        const event = events.find(e => {
            const id = this.owlLifeService.extractId(e.link);
            return id === eventId;
        });

        if (!event) {
            console.error("No match", eventId);
            throw new NotFoundException('Event not found')
        }

        const content = `
        Event Report
        -------------
        Event ID: ${eventId}
        Title: ${event!.title}
        Date: ${event!.pubDate}
        Reservation Count: ${event.reservationCount}

        `;

        return Buffer.from(content, 'utf-8');
    }

    async generateReport(eventId: string): Promise<Buffer> {
        //Mock data
        // const event = {
        //     id: 693156512253053250806635,
        //     title: 'KSU Career Fair',
        //     eventDate: '10-27-2025',
        //     reservationCount: 100,
        //     location: 'Student Success Center',
        // };

        //Fetch data from MongoDB
        const event = await this.eventModel.findById(eventId).exec();

        if (!event) {
            throw new NotFoundException(`Event not found`);
        }

        //Create file
        const content = `
        Event Report
        -------------
        Event ID: ${event!.id}
        Title: ${event!.title}
        Date: ${event!.eventDate}
        Location: ${event!.location}
        Reservation Count: ${event!.reservationCount}
        `;

        //Return
        return Buffer.from(content, 'utf-8');
    
        //http://localhost:3000/api/report/download/

    }
}
