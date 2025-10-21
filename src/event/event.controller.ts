// src/event/event.controller.ts
import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto, UpdateEventDto, QueryEventsDto } from './dto/event.dto';

@Controller('api/events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  getEvents(@Query() query: QueryEventsDto) {
    return this.eventService.findAll(query);
  }

  @Get(':id')
  getEvent(@Param('id') id: string) {
    return this.eventService.findOne(id);
  }

  @Post()
  createEvent(@Body() dto: CreateEventDto) {
    return this.eventService.create(dto);
  }

  @Put(':id')
  updateEvent(@Param('id') id: string, @Body() dto: UpdateEventDto) {
    return this.eventService.update(id, dto);
  }

  @Delete(':id')
  deleteEvent(@Param('id') id: string) {
    return this.eventService.remove(id);
  }
}
