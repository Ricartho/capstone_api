import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { Date, HydratedDocument } from 'mongoose';

export type EventDocument = HydratedDocument<Event>;

@Schema()
export class Progress{
        
        @Prop()
        id_user: string;

        @Prop()
        id_event: string;

        @Prop()
        event_title:string

        @Prop({ type:Date, default: Date.now})
        datePosted: string;


    }

export const ProgressSchema = SchemaFactory.createForClass(Progress);