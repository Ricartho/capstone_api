import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Types } from 'mongoose';
import { Milestone, MilestoneDocument } from './entity/milestone.schema';
import {
  UserMilestoneProgress,
  UserMilestoneProgressDocument,
} from './entity/user-milestone-progress.schema';
import {
  CreateMilestoneDto,
  UpdateMilestoneDto,
  QueryMilestonesDto,
} from './dto/milestone.dto';

@Injectable()
export class MilestoneService {
  constructor(
    @InjectModel(Milestone.name)
    private readonly milestoneModel: Model<MilestoneDocument>,
    @InjectModel(UserMilestoneProgress.name)
    private readonly userProgressModel: Model<UserMilestoneProgressDocument>,
  ) {}

  async create(dto: CreateMilestoneDto): Promise<Milestone> {
    const created = new this.milestoneModel(dto);
    return created.save();
  }

  async findAll(query: QueryMilestonesDto): Promise<{ milestones: Milestone[] }> {
    const filter: FilterQuery<MilestoneDocument> = {};

    if (query.title) {
      filter.title = { $regex: query.title, $options: 'i' };
    }

    const milestones = await this.milestoneModel
      .find(filter)
      .sort({ createdAt: -1 })
      .exec();

    return { milestones };
  }

  async findOne(id: string): Promise<Milestone> {
    const milestone = await this.milestoneModel.findById(id).exec();
    if (!milestone) {
      throw new NotFoundException('Milestone not found');
    }
    return milestone;
  }

  async update(id: string, dto: UpdateMilestoneDto): Promise<Milestone> {
    const updated = await this.milestoneModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();

    if (!updated) {
      throw new NotFoundException('Milestone not found');
    }

    return updated;
  }

  async remove(id: string): Promise<{ id: string; title: string }> {
    const deleted = await this.milestoneModel.findByIdAndDelete(id).exec();
    if (!deleted) {
      throw new NotFoundException('Milestone not found');
    }
    return { id: deleted.id, title: deleted.title };
  }

  // Global milestone definition: which events count

  async addEvent(milestoneId: string, eventId: string): Promise<Milestone> {
    const updated = await this.milestoneModel
      .findByIdAndUpdate(
        milestoneId,
        { $addToSet: { events: new Types.ObjectId(eventId) } },
        { new: true },
      )
      .exec();

    if (!updated) throw new NotFoundException('Milestone not found');
    return updated;
  }

  async removeEvent(milestoneId: string, eventId: string): Promise<Milestone> {
    const updated = await this.milestoneModel
      .findByIdAndUpdate(
        milestoneId,
        { $pull: { events: new Types.ObjectId(eventId) } },
        { new: true },
      )
      .exec();

    if (!updated) throw new NotFoundException('Milestone not found');
    return updated;
  }

  // Per user progress

  async addEventForUser(milestoneId: string, userId: string, eventId: string) {
    const milestone = await this.milestoneModel.findById(milestoneId).exec();
    if (!milestone) throw new NotFoundException('Milestone not found');

    const updatedProgress = await this.userProgressModel
      .findOneAndUpdate(
        {
          user: new Types.ObjectId(userId),
          milestone: milestone._id,
        },
        {
          $addToSet: { completedEvents: new Types.ObjectId(eventId) },
        },
        {
          new: true,
          upsert: true,
        },
      )
      .exec();

    return this.buildUserProgressResponse(milestone, updatedProgress);
  }

  async removeEventForUser(milestoneId: string, userId: string, eventId: string) {
    const milestone = await this.milestoneModel.findById(milestoneId).exec();
    if (!milestone) throw new NotFoundException('Milestone not found');

    const updatedProgress = await this.userProgressModel
      .findOneAndUpdate(
        {
          user: new Types.ObjectId(userId),
          milestone: milestone._id,
        },
        {
          $pull: { completedEvents: new Types.ObjectId(eventId) },
        },
        {
          new: true,
        },
      )
      .exec();

    return this.buildUserProgressResponse(milestone, updatedProgress ?? null);
  }

  async getUserProgress(milestoneId: string, userId: string) {
    const milestone = await this.milestoneModel.findById(milestoneId).exec();
    if (!milestone) throw new NotFoundException('Milestone not found');

    const progress = await this.userProgressModel
      .findOne({
        user: new Types.ObjectId(userId),
        milestone: milestone._id,
      })
      .exec();

    return this.buildUserProgressResponse(milestone, progress ?? null);
  }

  // Called when a user attends an event
  async updateUserProgressForEvent(userId: string, eventId: string): Promise<void> {
    const eventObjectId = new Types.ObjectId(eventId);
    const userObjectId = new Types.ObjectId(userId);

    const milestones = await this.milestoneModel
      .find({ events: eventObjectId })
      .exec();

    if (milestones.length === 0) {
      return;
    }

    await Promise.all(
      milestones.map((milestone) =>
        this.userProgressModel
          .findOneAndUpdate(
            {
              user: userObjectId,
              milestone: milestone._id,
            },
            {
              $addToSet: { completedEvents: eventObjectId },
            },
            {
              new: true,
              upsert: true,
            },
          )
          .exec(),
      ),
    );
  }

  private buildUserProgressResponse(
    milestone: MilestoneDocument,
    progress: UserMilestoneProgressDocument | null,
  ) {
    const completedEvents = progress?.completedEvents ?? [];
    const allowedEventIds = (milestone.events ?? []).map((id) => id.toString());

    let currentEventCount: number;

    if (allowedEventIds.length > 0) {
      currentEventCount = completedEvents.filter((id) =>
        allowedEventIds.includes(id.toString()),
      ).length;
    } else {
      currentEventCount = completedEvents.length;
    }

    const completed = currentEventCount >= milestone.goalEventCount;

    return {
      milestoneId: milestone.id,
      title: milestone.title,
      description: milestone.description,
      goalEventCount: milestone.goalEventCount,
      currentEventCount,
      completed,
    };
  }
}
