import { ApiProperty } from "@nestjs/swagger";


export class MilestoneDto{

    @ApiProperty({
        example: '67fd4f4f438adc5d59152243',
        description: 'The unique identifier of the Milestone',
    })
    public id: string;

    @ApiProperty({
        example: 'Milestone title',
        description: 'The title of the Milestone',
    })
    public title: string;

    @ApiProperty({
        example: 'Milestone category',
        description: 'The category of the Milestone',
    })
    public category: string;



    @ApiProperty({
        example: '0',
        description: 'The reservation count of the Milestone',
    })
    public criteria: number;


    @ApiProperty({
        example: 'FALSE',
        description: 'Is the Milestone still active or archived',
    })
    public archived: boolean;

    @ApiProperty({
        example: '22/10/2025',
        description:  'The date of the Milestone is posted on the system',
    })
    public datePosted: string;

    @ApiProperty({
        example: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        description:  'The description of the Milestone',
    })
    public description: string;

    @ApiProperty({
        example: 'Author Test',
        description:  'The author of the Milestone',
    })
    public author: string;
    

}