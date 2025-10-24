import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event } from '../event/entity/event.schema';

@Injectable()
export class ReportService {
    constructor(
        @InjectModel(Event.name) private eventModel: Model<Event>,
    ) {}

    async generateReport(eventId: string): Promise<Buffer> {
        //Mock data
        // const eventData = {
        //     id: eventId,
        //     title: 'KSU Career Fair',
        //     date: '10-27-2025',
        //     attendees: 100,
        //     location: 'Student Success Center',
        // };

        //Fetch data from MongoDB
        const event = await this.eventModel.findById(eventId).exec();

        //Create file
        const content = `
        Event Report
        -------------
        Event ID: ${event!._id}
        Title: ${event!.title}
        Data: ${event!.eventDate}
        Location: ${event!.location}
        Attendees: ${event!.reservationCount}
        `;

        //Return
        return Buffer.from(content, 'utf-8');
    
    }
}
