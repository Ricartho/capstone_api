import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({
  collection: 'milestones',
  timestamps: true,
})
export class Milestone {
  @Prop({ required: true, trim: true })
  title!: string;

  @Prop({ type: String, default: '' })
  description!: string;

  @Prop({ type: Number, required: true, min: 0 })
  goalEventCount!: number;

  // Events that can count toward this milestone
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Event' }], default: [] })
  events!: Types.ObjectId[];

  createdAt?: Date;
  updatedAt?: Date;
}

export type MilestoneDocument = Milestone & Document;

export const MilestoneSchema = SchemaFactory.createForClass(Milestone);

MilestoneSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_: any, ret: any) => {
    ret.id = ret._id;
    delete ret._id;
    return ret;
  },
});

MilestoneSchema.virtual('currentEventCount').get(function (this: MilestoneDocument) {
  return this.events?.length ?? 0;
});
