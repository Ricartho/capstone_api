import { Injectable } from '@nestjs/common';

@Injectable()
export class ReportService {
    async generateReport(eventId: string): Promise<Buffer> {
        //Mock data
        const eventData = {
            id: eventId,
            title: 'KSU Career Fair',
            date: '10-27-2025',
            attendees: 100,
            location: 'Student Success Center',
        };

        //Create file
        const content = `
        Event Report
        -------------
        Event ID: ${eventData.id}
        Title: ${eventData.title}
        Data: ${eventData.date}
        Location: ${eventData.location}
        Attendees: ${eventData.attendees}
        `;

        //Return
        return Buffer.from(content, 'utf-8');
    
    }
}
