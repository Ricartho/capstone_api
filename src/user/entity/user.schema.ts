import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User{
    
    @Prop()
    studentNB: string;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop({default: false})
    admin: boolean;

    @Prop({default: false})
    active: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);