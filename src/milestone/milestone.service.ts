import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import { Milestone, MilestoneDocument } from './entity/milestone.schema';
import { CreateMilestoneDto, UpdateMilestoneDto, QueryMilestonesDto } from './dto/milestone.dto';

@Injectable()
export class MilestoneService {
  constructor(
    @InjectModel(Milestone.name)
    private readonly milestoneModel: Model<MilestoneDocument>,
  ) {}

  async create(dto: CreateMilestoneDto): Promise<Milestone> {
    const created = new this.milestoneModel(dto);
    return created.save();
  }

  async findAll(query: QueryMilestonesDto): Promise<{ milestones: Milestone[] }> {
    const filter: FilterQuery<MilestoneDocument> = {};
    if (query.title) filter.title = { $regex: query.title, $options: 'i' };

    const milestones = await this.milestoneModel.find(filter).sort({ createdAt: -1 }).exec();
    return { milestones };
  }

  async findOne(id: string): Promise<Milestone> {
    const milestone = await this.milestoneModel.findById(id).exec();
    if (!milestone) throw new NotFoundException('Milestone not found');
    return milestone;
  }

  async update(id: string, dto: UpdateMilestoneDto): Promise<Milestone> {
    const updated = await this.milestoneModel.findByIdAndUpdate(id, dto, { new: true }).exec();
    if (!updated) throw new NotFoundException('Milestone not found');
    return updated;
  }

  async remove(id: string): Promise<{ id: string; title: string }> {
    const deleted = await this.milestoneModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException('Milestone not found');
    return { id: deleted.id, title: deleted.title };
  }
}
