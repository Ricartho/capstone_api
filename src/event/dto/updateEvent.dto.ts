import { ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateEventDto {

    @ApiPropertyOptional({
        example: 'Event title',
        description: 'The title of the event',
        })
        public title?: string;


    @ApiPropertyOptional({
        example: 'Event category',
        description: 'The category of the event',
         })
        public category?: string[];
     
    @ApiPropertyOptional({
        example: 'Event location',
        description: 'The location of the event',
         })
        public location?: string;
     
    @ApiPropertyOptional({
        example: '0',
        description: 'The reservation count of the event',
         })
        public reservationCount?: number;
     
    @ApiPropertyOptional({
        example: '22/10/2025',
        description: 'The date of the event',
         })
         public eventDate?: string;
     
    @ApiPropertyOptional({
        example: '11:00 AM',
        description: 'The time of the event',
         })
         public eventTimeStart?: string;
    @ApiPropertyOptional({
        example: '11:00 AM',
        description: 'The time of the event',
         })
         public eventTimeEnd?: string;

    @ApiPropertyOptional({
        example: 'FALSE',
        description: 'Is the event still active or archived',
         })
        public archived?: boolean;

    @ApiPropertyOptional({
        example: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        description: 'The description of the event',
      })
        public description: string;

}