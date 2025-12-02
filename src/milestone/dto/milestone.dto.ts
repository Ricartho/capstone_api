import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class CreateMilestoneDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsInt()
  @Min(0)
  goalEventCount!: number;
}

export class UpdateMilestoneDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsInt()
  @Min(0)
  @IsOptional()
  goalEventCount?: number;
}

export class QueryMilestonesDto {
  @IsString()
  @IsOptional()
  title?: string;
}
