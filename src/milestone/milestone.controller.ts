import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { MilestoneService } from './milestone.service';
import { CreateMilestoneDto, UpdateMilestoneDto, QueryMilestonesDto } from './dto/milestone.dto';

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
}
