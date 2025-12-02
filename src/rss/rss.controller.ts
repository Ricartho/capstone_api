import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { RssService } from './rss.service';

@Controller('rss')
export class RssController {
    constructor(private rssService: RssService) {}

    @Get('merged')
    async getMergedFeed(@Res() res: Response) {
        const xml = await this.rssService.mergeFeeds();

        res.setHeader('Content-Type', 'application/rss+xml');
        res.send(xml);
    }
}