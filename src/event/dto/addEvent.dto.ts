import { ApiProperty } from "@nestjs/swagger";

export class AddEventDto {

    @ApiProperty({
        example: 'Event title',
        description: 'The title of the event',
    })
    public title: string;

    @ApiProperty({
        example: 'Event category',
        description: 'The category of the event',
    })
    public category: string;

    @ApiProperty({
        example: 'Event location',
        description: 'The location of the event',
    })
    public location: string;


    @ApiProperty({
        example: '22/10/2025',
        description: 'The date of the event',
    })
    public eventDate: string;

    @ApiProperty({
        example: '11:00 AM',
        description: 'The time of the event',
    })
    public eventTime: string;


}