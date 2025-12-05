import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event } from '../event/entity/event.schema';
import { Logger } from "@nestjs/common";


@Injectable()
export class ReportService{

    constructor(
        @InjectModel(Event.name) private EventModel: Model<Event>,
    ){}


     async generateAllReports(): Promise<Buffer>{
        Logger.log("all Report service reached");
        //Fetch data from MongoDB
        const events = await this.EventModel.find().exec();

        if (!events || events.length === 0 ){
            throw new NotFoundException('No events found');
        }

        //Create report
        const header = 'All Events\n';
        const reports = events
        .map((event,index) => {
            return `
            #${index + 1}
            Title: ${event.title}
            Category: ${event.category}
            Date: ${event.eventDate}
            Location: ${event.location}
            Reservation Count: ${event.reservationCount}
            ------------------------`;
        })
        .join('\n\n');

        //   const event = {
        //     id: 693156512253053250806635,
        //     title: 'KSU Career Fair',
        //     eventDate: '10-27-2025',
        //     reservationCount: 100,
        //     location: 'Student Success Center',
        // };

        const fullReport = header + reports + '\n';
        // return fullReport;
        // return event;
        return Buffer.from(fullReport, 'utf-8');
       
    }

     async generateReport(eventId: string): Promise<Buffer> {
        Logger.log("Report service reached");

        //Fetch data from MongoDB
        const event = await this.EventModel.findById(eventId).exec();
        // Logger.log(event);
        if (!event) {
            throw new NotFoundException(`Event not found`);
        }

        //Create file
        const content = `
        Event Report
        --------------------------
        Title: ${event!.title}
        Category: ${event!.category}
        Date: ${event!.eventDate}
        Location: ${event!.location}
        Reservation Count: ${event!.reservationCount}
        --------------------------
        `;

    //   return content;
        return Buffer.from(content, 'utf-8');
    
        

    }
}