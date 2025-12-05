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
        // //Retrieve event
        // if(!Types.ObjectId.isValid(id)){
        //     throw new NotFoundException(`Invalid event id`);
        // }

        // const event = await this.eventModel.findById(id).exec();
        // if(!event) {
        //     throw new NotFoundException(`Event not found`);
        // }


    try {
        console.log("Download request ID:", id);

        // If it's a MongoDB ID, fetch title + validate
        let fileName = `event-${id}.txt`;

        const isMongoId = /^[0-9a-fA-F]{24}$/.test(id);

        if (isMongoId) {
            const event = await this.eventModel.findById(id).exec();

            if (!event) {
                throw new NotFoundException("Event not found in MongoDB");
            }

            fileName =
                "report-" + event.title.replace(/[^a-z0-9_\-]/gi, "_") + ".txt";
        } else {
            // External event — name it using the ID
            fileName = `report-owllife-${id}.txt`;
        }

        // Generate the correct report (internal or external)
        const fileBuffer = await this.reportService.generateUnifiedReport(id);

        res.setHeader("Content-Disposition", `attachment; filename=${fileName}`);
        res.setHeader("Content-Type", "text/plain");

        res.send(fileBuffer);

    } catch (err) {
    console.error("ERROR:", err);
    throw err;
}

     }

}
