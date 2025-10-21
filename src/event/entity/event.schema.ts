// src/event/event.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'events', timestamps: { createdAt: 'datePosted', updatedAt: 'updatedAt' } })
export class Event {
  @Prop({ required: true, trim: true }) title!: string;
  @Prop({ required: true }) eventDate!: string;
  @Prop({ required: true }) eventTime!: string;
  @Prop({ required: true, index: true }) category!: string;
  @Prop({ required: true }) location!: string;
  @Prop({ type: Number, default: 0, min: 0 }) reservationCount!: number;
  @Prop({ type: Boolean, default: false, index: true }) archived!: boolean;
  @Prop({ type: Date, default: Date.now }) datePosted!: Date;
  updatedAt?: Date;
}
export type EventDocument = Event & Document;
export const EventSchema = SchemaFactory.createForClass(Event);

EventSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_: any, ret: any) => {
    ret.id = ret._id;
    delete ret._id;
    return ret;
  },
});
