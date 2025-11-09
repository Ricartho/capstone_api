import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event } from '../event/entity/event.schema';

@Injectable()
export class ReportService {
    constructor(
        @InjectModel(Event.name) private eventModel: Model<Event>,
    ) {}

    async generateAllReports(): Promise<Buffer> {
        //Mock data
        const mockData = [ {
            title: 'KSU Career Fair',
            eventDate: '10-27-2025',
            reservationCount: 100,
            location: 'Student Success Center',
        },
        {
            title: 'C-Day',
            eventDate: '11-10-2025',
            reservationCount: 100,
            location: 'Student Success Center',
        },
        ];

        //Fetch data from MongoDB
        //const events = await this.eventModel.find().exec();


        //Create report
        const header = 'All Events\n';
        const reports = mockData
        .map((event,index) => {
            return `
            #${index + 1}
            Title: ${event.title}
            Date: ${event.eventDate}
            Location: ${event.location}
            Reservation Count: ${event.reservationCount}
            ------------------------`;
        })
        .join('\n\n');

        const fullReport = header + reports + '\n';
        return Buffer.from(fullReport, 'utf-8');
    }

    async generateReport(eventId: string): Promise<Buffer> {
        //Mock data
        const eventData = {
            id: eventId,
            title: 'KSU Career Fair',
            eventDate: '10-27-2025',
            reservationCount: 100,
            location: 'Student Success Center',
        };

        //Fetch data from MongoDB
        //const event = await this.eventModel.findById(eventId).exec();

        //Create file
        const content = `
        Event Report
        -------------
        Event ID: ${eventData.id}
        Title: ${eventData.title}
        Date: ${eventData.eventDate}
        Location: ${eventData.location}
        Reservation Count: ${eventData.reservationCount}
        `;

        //Return
        return Buffer.from(content, 'utf-8');
    
    }
}
