import { Controller, Get, Param, Res, NotFoundException,StreamableFile } from '@nestjs/common';
import { Response } from 'express';
import { Logger } from "@nestjs/common";
import { ReportService } from './report.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Event } from '../event/entity/event.schema';



@Controller('report')
export class ReportController {

    constructor(private readonly reportService: ReportService,
        @InjectModel(Event.name) private readonly EventModel: Model<Event>,
    ) {}

    @Get('download/all')
    async downloadAllReports(@Res() res: Response){
        Logger.log("all Report controller reached");
        const reportBuffer = await this.reportService.generateAllReports();
        res.setHeader('Content-Disposition', 'attachment; filename=all-events.txt');
        res.setHeader('Content-Type', 'text/plain');
        res.send(reportBuffer);
    }



    @Get('download/:id')
    async downloadReport(@Param('id') id: string, @Res() res: Response){
    
        Logger.log("Report controller reached");
    try {
        console.log("Download request ID:", id);

        // If it's a MongoDB ID, fetch title + validate
        let fileName = `event-${id}.txt`;

        // const isMongoId = /^[0-9a-fA-F]{24}$/.test(id);
        const event = await this.EventModel.findById(id).exec();

        if (!event) {
            throw new NotFoundException("Event not found in MongoDB");
        }

        fileName ="report-" + event.title.replace(/[^a-z0-9_\-]/gi, "_") + ".txt";
       

        // Generate the correct report (internal or external)
        const fileBuffer = this.reportService.generateReport(id);

        res.setHeader("Content-Disposition", `attachment; filename=${fileName}`);
        res.setHeader("Content-Type", "text/plain");

        res.send(fileBuffer);
        // return new StreamableFile(fileBuffer);
        // return fileBuffer;

    } catch (err) {
    console.error("ERROR:", err);
    throw err;
        }

     }

}