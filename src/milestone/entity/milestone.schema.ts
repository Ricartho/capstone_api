import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { Date, HydratedDocument } from 'mongoose';

export type MilestoneDocument = HydratedDocument<Milestone>;

@Schema()
export class Milestone{
        
        @Prop()
        title: string;

        @Prop()
        category: string;

       @Prop({default: 0})
        criteria: number;

        @Prop({default: false})
        archived: boolean;

        @Prop()
        description: string;

        @Prop()
        author:string

        @Prop({ type:Date, default: Date.now})
        datePosted: string;
    }

export const MilestoneSchema = SchemaFactory.createForClass(Milestone);