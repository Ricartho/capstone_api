import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Event, EventDocument } from './entity/event.schema';
import { CreateEventDto, QueryEventsDto, UpdateEventDto } from './dto/event.dto';
import { MilestoneService } from '../milestone/milestone.service';

@Injectable()
export class EventService {
  constructor(
    @InjectModel(Event.name)
    private readonly eventModel: Model<EventDocument>,
    private readonly milestoneService: MilestoneService,
  ) {}

  async create(dto: CreateEventDto): Promise<Event> {
    const toCreate: Partial<Event> = {
      title: dto.title,
      eventDate: dto.eventDate,
      eventTime: dto.eventTime,
      category: dto.category,
      location: dto.location,
      reservationCount: dto.reservationCount ?? 0,
      archived: dto.archived ?? false,
      datePosted: dto.datePosted ?? new Date(),
    } as any;

    const created = new this.eventModel(toCreate);
    return created.save();
  }

  async findAll(query: QueryEventsDto): Promise<{ events: Event[] }> {
    const filter: FilterQuery<EventDocument> = {};

    if (query.title) {
      filter.title = { $regex: query.title, $options: 'i' };
    }

    if (query.category) {
      filter.category = query.category;
    }

    const events = await this.eventModel.find(filter).sort({ datePosted: -1 }).exec();
    return { events };
  }

  async findOne(id: string): Promise<Event> {
    const event = await this.eventModel.findById(id).exec();
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    return event;
  }

  async update(id: string, dto: UpdateEventDto): Promise<Event> {
    const updated = await this.eventModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();

    if (!updated) {
      throw new NotFoundException('Event not found');
    }

    return updated;
  }

  async remove(id: string): Promise<{ id: string; title: string }> {
    const deleted = await this.eventModel.findByIdAndDelete(id).exec();
    if (!deleted) {
      throw new NotFoundException('Event not found');
    }
    return { id: deleted.id, title: deleted.title };
  }

  // User attends an event: bump reservationCount and update that user's milestone progress
  async recordAttendance(eventId: string, userId: string): Promise<Event> {
    const event = await this.eventModel
      .findByIdAndUpdate(
        eventId,
        { $inc: { reservationCount: 1 } },
        { new: true },
      )
      .exec();

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    // Update all milestones that include this event for this user
    await this.milestoneService.updateUserProgressForEvent(userId, eventId);

    return event;
  }
}
