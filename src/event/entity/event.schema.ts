import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { Date, HydratedDocument } from 'mongoose';

export type EventDocument = HydratedDocument<Event>;

@Schema()
export class Event{
        
        @Prop()
        title: string;

        @Prop()
        category: string;

        @Prop()
        location: string;

        @Prop()
        reservationCount: number;

        @Prop()
        eventDate: string;

        @Prop()
        archived: boolean;

        @Prop()
        datePosted: string
    }

export const EventSchema = SchemaFactory.createForClass(Event);