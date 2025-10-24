import { Module } from "@nestjs/common";
import { MongooseModule, Schema } from "@nestjs/mongoose";
import { Event,EventSchema } from "./entity/event.schema";
import { EventController } from "./event.controller";
import { EventService } from "./event.service";
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports:[
        MongooseModule.forFeature([{name:Event.name, schema:EventSchema}]),
    ],
    controllers:[EventController],
    providers:[EventService]
})

export class eventModule{}