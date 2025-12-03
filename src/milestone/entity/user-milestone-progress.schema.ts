import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({
  collection: 'user_milestone_progress',
  timestamps: true,
})
export class UserMilestoneProgress {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Milestone', required: true })
  milestone!: Types.ObjectId;

  // Events this user has completed for this milestone
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Event' }], default: [] })
  completedEvents!: Types.ObjectId[];
}

export type UserMilestoneProgressDocument = UserMilestoneProgress & Document;

export const UserMilestoneProgressSchema =
  SchemaFactory.createForClass(UserMilestoneProgress);

UserMilestoneProgressSchema.index({ user: 1, milestone: 1 }, { unique: true });
