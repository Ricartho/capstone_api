import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;

@Schema()
export class Category{
        
        @Prop()
        title: string;

        @Prop()
        uniqCode: string;

        @Prop({default: false})
        archived: boolean;

        @Prop({ type:Date, default: Date.now})
        datePosted: string;

        @Prop()
        description: string;

        @Prop()
        author:string
    }

export const CategorySchema = SchemaFactory.createForClass(Category);