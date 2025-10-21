import { IsBoolean, IsDateString, IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class CreateEventDto {
  @IsString() @IsNotEmpty()
  title!: string;

  // keep as strings to match your API contract
  @IsString() @IsNotEmpty()
  eventDate!: string;

  @IsString() @IsNotEmpty()
  eventTime!: string;

  @IsString() @IsNotEmpty()
  category!: string;

  @IsString() @IsNotEmpty()
  location!: string;

  @IsInt() @Min(0) @IsOptional()
  reservationCount?: number = 0;

  @IsBoolean() @IsOptional()
  archived?: boolean = false;

  @IsDateString() @IsOptional()
  datePosted?: Date;
}

export class UpdateEventDto {
  @IsString() @IsOptional()
  title?: string;

  @IsString() @IsOptional()
  eventDate?: string;

  @IsString() @IsOptional()
  eventTime?: string;

  @IsString() @IsOptional()
  category?: string;

  @IsString() @IsOptional()
  location?: string;

  @IsBoolean() @IsOptional()
  archived?: boolean;

  @IsInt() @Min(0) @IsOptional()
  reservationCount?: number;
}

export class QueryEventsDto {
  @IsString() @IsOptional()
  title?: string;     // full text search on title

  @IsString() @IsOptional()
  category?: string;  // exact match or list
}
