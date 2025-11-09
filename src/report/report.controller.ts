import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { ReportService } from './report.service';

@Controller('report')
export class ReportController {
    constructor(private readonly reportService: ReportService) {}

    @Get('download/all')
    async downloadAllReports(@Res() res: Response){
        const reportBuffer = await this.reportService.generateAllReports();
        res.setHeader('Content-Disposition', 'attachment; filename=all-events.txt');
        res.setHeader('Content-Type', 'text/plain');
        res.send(reportBuffer);
    }

    @Get('download/:id')
    async downloadReport(@Param('id') id: string, @Res() res:Response){
        //Create the file
        const fileBuffer = await this.reportService.generateReport(id);

        //Response header for the file download
        res.setHeader('Content-Disposition', `attachment; filename=report-${id}.txt`);
        res.setHeader('Content-Type', 'text/plain');

        //Send file
        res.send(fileBuffer);
    }

}
