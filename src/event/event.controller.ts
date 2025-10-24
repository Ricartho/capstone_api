import { Controller, Get, Post, Body,InternalServerErrorException} from "@nestjs/common";
import { EventService } from "./event.service";
import { AddEventDto } from "./dto/addEvent.dto";
import { EventDto } from "./dto/event.dto";
import {
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';


@ApiTags('events')
@Controller('events')
export class EventController{

    constructor(private eventService: EventService){}

        //get all events
      @Get()

        @ApiOperation({summary: 'Get all events from DB'})
        @ApiResponse({
        status: 200,
        description: 'All events are retreive from DB',
        example: '[{id: "68ae92da654aae1ba5aa7f87",title: "test", category: "test"},{id: "68ae92da654aae1ba5aa7f87",title: "test2", category: "test"}]',
        })
        @ApiResponse({status: 400,description:'Error while getting events'})

        async getAllEvents(){
            try{
                return await this.eventService.getAllEvents();
            }catch{
                throw new InternalServerErrorException("Error while accessing events");
            }
          
        }

        //add new event
      @Post()

        @ApiOperation({summary: 'Create a new event.'})
        @ApiResponse({
        status: 201,
        description: 'Event create and saved in DB',
        example: '{id: "68ae92da654aae1ba5aa7f87",title: "test", category: "test"}',
        })
        @ApiResponse({status: 400,description:'Error while creating new event'})

        async addNewEvent(@Body() dto: AddEventDto): Promise<EventDto>{
            try{
                return await this.eventService.addNewEvent(dto);
            }catch{
                throw new InternalServerErrorException("Error while accessing events");
            }
            
        }


}