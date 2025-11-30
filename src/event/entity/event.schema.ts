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

        @Prop({default: 0})
        reservationCount: number;

        @Prop({ type: Date})
        eventDate: string;

        @Prop()
        eventTime: string;

        @Prop({default: false})
        archived: boolean;

        @Prop({ type:Date, default: Date.now})
        datePosted: string

        // @Prop()
        // author:string
    }

export const EventSchema = SchemaFactory.createForClass(Event);