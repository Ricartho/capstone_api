import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { MilestoneService } from './milestone.service';
import {
  CreateMilestoneDto,
  UpdateMilestoneDto,
  QueryMilestonesDto,
} from './dto/milestone.dto';

@Controller('api/milestones')
export class MilestoneController {
  constructor(private readonly milestoneService: MilestoneService) {}

  @Get()
  getMilestones(@Query() query: QueryMilestonesDto) {
    return this.milestoneService.findAll(query);
  }

  @Get(':id')
  getMilestone(@Param('id') id: string) {
    return this.milestoneService.findOne(id);
  }

  @Post()
  createMilestone(@Body() dto: CreateMilestoneDto) {
    return this.milestoneService.create(dto);
  }

  @Put(':id')
  updateMilestone(@Param('id') id: string, @Body() dto: UpdateMilestoneDto) {
    return this.milestoneService.update(id, dto);
  }

  @Delete(':id')
  deleteMilestone(@Param('id') id: string) {
    return this.milestoneService.remove(id);
  }

  // Global definition: which events count toward this milestone
  @Post(':id/events/:eventId')
  addEventToMilestone(@Param('id') id: string, @Param('eventId') eventId: string) {
    return this.milestoneService.addEvent(id, eventId);
  }

  @Delete(':id/events/:eventId')
  removeEventFromMilestone(@Param('id') id: string, @Param('eventId') eventId: string) {
    return this.milestoneService.removeEvent(id, eventId);
  }

  // Per user progress endpoints

  @Post(':id/users/:userId/events/:eventId')
  addEventForUser(
    @Param('id') milestoneId: string,
    @Param('userId') userId: string,
    @Param('eventId') eventId: string,
  ) {
    return this.milestoneService.addEventForUser(milestoneId, userId, eventId);
  }

  @Delete(':id/users/:userId/events/:eventId')
  removeEventForUser(
    @Param('id') milestoneId: string,
    @Param('userId') userId: string,
    @Param('eventId') eventId: string,
  ) {
    return this.milestoneService.removeEventForUser(milestoneId, userId, eventId);
  }

  @Get(':id/users/:userId/progress')
  getUserProgress(
    @Param('id') milestoneId: string,
    @Param('userId') userId: string,
  ) {
    return this.milestoneService.getUserProgress(milestoneId, userId);
  }
}
