import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User{
    
    // @Prop()
    // studentNB: string;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop({default: false})
    admin: boolean;

    @Prop({default: true})
    active: boolean;

    @Prop({default:0})
    loginCount: number;
}

export const UserSchema = SchemaFactory.createForClass(User);