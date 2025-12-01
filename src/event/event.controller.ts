import { Controller, Get, Post,Param, Put,Delete,Body,UseGuards,InternalServerErrorException} from "@nestjs/common";
import { AuthGuard } from "src/user/auth.guard";
import { GetUserId } from "src/decorator/getUser.decorator";
import { Logger } from "@nestjs/common";
import { EventService } from "./event.service";
import { AddEventDto } from "./dto/addEvent.dto";
import { EventDto } from "./dto/event.dto";
import { UpdateEventDto } from "./dto/updateEvent.dto";
import {
    ApiBearerAuth,
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

        async getAllEvents():Promise<any>{
            try{
                return await this.eventService.getAllEvents();
            }catch{
                throw new InternalServerErrorException("Error while accessing events");
            }
          
        }


    //get a single event from Db using ID
    @Get(':id')

        @ApiOperation({summary: 'Get a specific event from DB'})
        @ApiResponse({
        status: 200,
        description: 'The event is retreived from DB',
        example: '[{id: "68ae92da654aae1ba5aa7f87",title: "test", category: "test"}]',
        })
        @ApiResponse({status: 400,description:'Error while getting events'})

        async getEvent(@Param('id') eventId: string):Promise<EventDto>{
            try{
                return await this.eventService.getEventById(eventId)
            }catch{
                throw new InternalServerErrorException("Error while accessing events");
            }
        }

    //add new event
    //the 3 following methods are LINKED to USERS through GetUserID(), need a current users on the system. Related to JWT as well, 
    // look register and login methods //IMPORTANT
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
                Logger.log("User creation action reached");
                return await this.eventService.addNewEvent(dto);
            }catch{
                throw new InternalServerErrorException("Error while accessing events");
            }
            
        }


    //Updade a single event by ID
    @Put(':id')

        @ApiOperation({summary: 'Update existing event.'})
        @ApiResponse({
            status: 201,
            description: 'Event updated and saved in DB',
            example: '{id: "68ae92da654aae1ba5aa7f87",title: "test", category: "test"}',
            })
        @ApiResponse({status: 400,description:'Error while creating new event'})

        async updateEvent(@Param('id') eventId: string, @Body() updateEventDto: UpdateEventDto):Promise<EventDto>{
            try{
                return await this.eventService.updateEventById(eventId,updateEventDto);
            }catch{
                throw new InternalServerErrorException("Error while updating the event");
            }
          }


    //delete a single using ID
    @Delete(':id')
        
        // @UseGuards(AuthGuard)
        // @ApiBearerAuth()
        @ApiOperation({summary: 'Delete existing event.'})
        @ApiResponse({
            status: 201,
            description: 'Event deleted from DB',
            example: '{id: "68ae92da654aae1ba5aa7f87",title: "test", category: "test"}',
         })
        @ApiResponse({status: 400,description:'Error while deleting event'})

        async deleteEvent(@Param('id') eventId:string):Promise<any>{
            try{
                return await this.eventService.deleteEventById(eventId);
            }catch{
                throw new InternalServerErrorException("Error while updating the event");
            }
        }

}