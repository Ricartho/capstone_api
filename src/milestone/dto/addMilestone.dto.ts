import { ApiProperty } from "@nestjs/swagger";

export class AddMilestoneDto {

    @ApiProperty({
        example: 'Milestone title',
        description: 'The title of the Milestone',
    })
    public title: string;


    @ApiProperty({
        example: 'Milestone criteria',
        description: 'The criteria of the Milestone',
    })
    public criteria: number;

    @ApiProperty({
        example: 'Milestone criteria',
        description: 'The criteria of the Milestone',
    })
    public category: string;


     @ApiProperty({
        example: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        description: 'The description of the Milestone',
    })
    public description: string;


}