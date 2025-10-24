import { ApiProperty } from "@nestjs/swagger";


export class EventDto{

    @ApiProperty({
        example: '67fd4f4f438adc5d59152243',
        description: 'The unique identifier of the event',
    })
    public id: string;

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
        example: '0',
        description: 'The reservation count of the event',
    })
    public reservationCount: number;

    @ApiProperty({
        example: '22/10/2025',
        description: 'The date of the event',
    })
    public eventDate: string;

    @ApiProperty({
        example: 'FALSE',
        description: 'Is the event still active or archived',
    })
    public archived: boolean;

    @ApiProperty({
        example: '22/10/2025',
        description:  'The date of the event is posted on the system',
    })
    public datePosted: string;
    

}