import { Controller, Get, Param, Res, NotFoundException } from '@nestjs/common';
import { Response } from 'express';
import { ReportService } from './report.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Event } from '../event/entity/event.schema';

@Controller('report')
export class ReportController {
    constructor(private readonly reportService: ReportService,
        @InjectModel(Event.name) private readonly eventModel: Model<Event>,
    ) {}

    @Get('download/all')
    async downloadAllReports(@Res() res: Response){
        const reportBuffer = await this.reportService.generateAllReports();
        res.setHeader('Content-Disposition', 'attachment; filename=all-events.txt');
        res.setHeader('Content-Type', 'text/plain');
        res.send(reportBuffer);
    }

    @Get('download/:id')
    async downloadReport(@Param('id') id: string, @Res() res:Response){
        //Retrieve event
        if(!Types.ObjectId.isValid(id)){
            throw new NotFoundException(`Invalid event id`);
        }

        const event = await this.eventModel.findById(id).exec();
        if(!event) {
            throw new NotFoundException(`Event not found`);
        }

        //Create the file
        const fileBuffer = await this.reportService.generateReport(id);

        //Clean title
        const cleanTitle = event.title.replace(/[^a-z0-9_\-]/gi, '_');

        //Response header for the file download
        res.setHeader('Content-Disposition', `attachment; filename=report-${cleanTitle}.txt`);
        res.setHeader('Content-Type', 'text/plain');

        //Send file
        res.send(fileBuffer);
    }

}
