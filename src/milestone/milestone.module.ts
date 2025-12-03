import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Milestone, MilestoneSchema } from './entity/milestone.schema';
import {
  UserMilestoneProgress,
  UserMilestoneProgressSchema,
} from './entity/user-milestone-progress.schema';
import { MilestoneController } from './milestone.controller';
import { MilestoneService } from './milestone.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Milestone.name, schema: MilestoneSchema },
      { name: UserMilestoneProgress.name, schema: UserMilestoneProgressSchema },
    ]),
  ],
  controllers: [MilestoneController],
  providers: [MilestoneService],
  exports: [MilestoneService],
})
export class MilestoneModule {}
