import { Injectable, ConflictException, UnauthorizedException} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Logger } from "@nestjs/common";
import {Event} from "./entity/event.schema";
import { AddEventDto } from "./dto/addEvent.dto";
import { EventDto } from "./dto/event.dto";


@Injectable()
export class EventService{

    //import the event model in the whole class
    constructor(@InjectModel(Event.name) private EventModel: Model<Event>){}

    //display all events in the DB
    async getAllEvents(){
        Logger.log("get all events action reached");
        let temp: string[] = [];
        const eventsFromDB = await this.EventModel.find({});
        //retreive all event from DB
        return eventsFromDB;
    }

    async addNewEvent(dto: AddEventDto): Promise<EventDto>{
            Logger.log("add event action reached");

            const {title,category,location,reservationCount,eventDate} = dto;

            const newEventData = {
                title: title,
                category: category,
                location: location,
                reservationCount: reservationCount,
                eventDate: eventDate,
            }

            //create and save in DB
            const newUser = new this.EventModel(newEventData);
            await newUser.save();

            return{

                id: newUser.id,
                title: newUser.title,
                category: newUser.category,
                location: newUser.location,
                reservationCount: newUser.reservationCount,
                eventDate: newUser.eventDate,
                archived: newUser.archived,
                datePosted: newUser.datePosted

            };
    }
}