import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User{
    
    @Prop()
    fName: string;

    @Prop()
    lName: string;

    @Prop()
    email: string;

    @Prop({default:"Ksu_2025#"})
    password: string;

    @Prop({default:"N/A"})
    author: string;

    @Prop({default: false})
    admin: boolean;

    @Prop({default: true})
    active: boolean;

    @Prop({default:0})
    loginCount: number;

    @Prop({ type:Date, default: Date.now})
    datePosted: string;
}

export const UserSchema = SchemaFactory.createForClass(User);