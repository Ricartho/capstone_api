import { Injectable, ConflictException, UnauthorizedException,NotFoundException} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Logger } from "@nestjs/common";
import {Event} from "./entity/event.schema";
import { AddEventDto } from "./dto/addEvent.dto";
import { UpdateEventDto } from "./dto/updateEvent.dto";
import { EventDto } from "./dto/event.dto";


@Injectable()
export class EventService{

    //import the event model in the whole class
    constructor(@InjectModel(Event.name) private EventModel: Model<Event>,){}
    

    //display all events from the DB
    async getAllEvents():Promise<any>{

        Logger.log("get all events action reached");
        
        //retreive all event from DB
        const eventsFromDB = await this.EventModel.find({}).sort({datePosted: 'desc'});

        Logger.log(eventsFromDB);
        return eventsFromDB;  

    }

    //get a specific event from DB using ID

    async getEventById(eventId: string):Promise<EventDto>{

          Logger.log(`Updating Extension with ID: '${eventId}'`);

          const eventFromDB = await this.EventModel.findById(eventId).exec();

          if(!eventFromDB){
            Logger.warn(`Event not found with ID: '${eventId}'`);
            throw new NotFoundException(`Event not using this ID :' ${eventId}' `);
          }

          return{

                id: eventFromDB.id,
                title: eventFromDB.title,
                category: eventFromDB.category,
                location: eventFromDB.location,
                reservationCount: eventFromDB.reservationCount,
                eventDate: eventFromDB.eventDate,
                eventTimeStart: eventFromDB.eventTimeStart,
                eventTimeEnd:eventFromDB.eventTimeEnd,
                archived: eventFromDB.archived,
                datePosted: eventFromDB.datePosted,
                description:eventFromDB.description,
                
          }
    }

    async addNewEvent(dto: AddEventDto): Promise<EventDto>{
            Logger.log("add event action reached");

            const {title,category,location,eventDate,eventTimeStart,eventTimeEnd,description} = dto;

            const newEventData = {
                title: title,
                category: category,
                location: location,
                eventDate: eventDate,
                eventTimeStart: eventTimeStart,
                eventTimeEnd: eventTimeEnd,
                description:description,
                
            }

            //create and save in DB
            const newEvent = new this.EventModel(newEventData);
            await newEvent.save();

            return{

                id: newEvent.id,
                title: newEvent.title,
                category: newEvent.category,
                location: newEvent.location,
                reservationCount: newEvent.reservationCount,
                eventDate: newEvent.eventDate,
                eventTimeStart: newEvent.eventTimeStart,
                eventTimeEnd:newEvent.eventTimeEnd,
                archived: newEvent.archived,
                datePosted: newEvent.datePosted,
                description:newEvent.description,

            };
    }


    async updateEventById(eventId: string, dto: UpdateEventDto):Promise<EventDto>{

          Logger.log(`Updating Extension with ID: '${eventId}'`);

          const eventToUpdate = await this.EventModel.findById(eventId).exec();
             
          //verify event exists in the DB 
          if(!eventToUpdate){
            Logger.warn(`Event not found with ID: '${eventId}'`);
            throw new NotFoundException(`Event not using this ID :' ${eventId}' `);
          }

          //verify that the current user of the system exist in the DB


          //verify that the current user is the author of the current event and have rights on it


          //then update event
          if(dto.title !== undefined) eventToUpdate.title = dto.title;
          if(dto.category !== undefined) eventToUpdate.category = dto.category;
          if(dto.location !== undefined) eventToUpdate.location = dto.location;
          if(dto.reservationCount !== undefined) eventToUpdate.reservationCount = dto.reservationCount;
          if(dto.eventDate !== undefined) eventToUpdate.eventDate = dto.eventDate;
          if(dto.eventTimeStart !== undefined) eventToUpdate.eventTimeStart = dto.eventTimeStart;
          if(dto.eventTimeEnd !== undefined) eventToUpdate.eventTimeEnd= dto.eventTimeEnd;
          if(dto.archived !== undefined) eventToUpdate.archived = dto.archived;
          if(dto.description !== undefined) eventToUpdate.description = dto.description;

          await eventToUpdate.save();

          return{

                id: eventToUpdate.id,
                title: eventToUpdate.title,
                category: eventToUpdate.category,
                location: eventToUpdate.location,
                reservationCount: eventToUpdate.reservationCount,
                eventDate: eventToUpdate.eventDate,
                eventTimeStart: eventToUpdate.eventTimeStart,
                eventTimeEnd: eventToUpdate.eventTimeEnd,
                archived: eventToUpdate.archived,
                datePosted: eventToUpdate.datePosted,
                description:eventToUpdate.description,
                
          }
    }

    async deleteEventById(eventId: string): Promise<any>{
      
        Logger.log(`Deleting event with ID: '${eventId}'`);

        const eventToDelete = await this.EventModel.findById(eventId).exec();

        //verify event exists in the DB 
          if(!eventToDelete){
            Logger.warn(`Event not found with ID: '${eventId}'`);
            throw new NotFoundException(`Event not using this ID :' ${eventId}' `);
          }

          //verify that the current user of the system exist in the DB


          //verify that the current user is the author of the current event and have rights on it


          const deletedEvent = await this.EventModel.deleteOne({_id: eventId});

          return deletedEvent;
    }
}