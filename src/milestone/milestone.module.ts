import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Milestone, MilestoneSchema } from './entity/milestone.schema';
import { MilestoneController } from './milestone.controller';
import { MilestoneService } from './milestone.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Milestone.name, schema: MilestoneSchema }])],
  controllers: [MilestoneController],
  providers: [MilestoneService],
  exports: [MilestoneService],
})
export class MilestoneModule {}
