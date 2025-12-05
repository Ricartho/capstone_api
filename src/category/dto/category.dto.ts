import { ApiProperty } from "@nestjs/swagger";


export class CategoryDto{

    @ApiProperty({
        example: '67fd4f4f438adc5d59152243',
        description: 'The unique identifier of the category',
    })
    public id: string;

    @ApiProperty({
        example: 'category title',
        description: 'The title of the category',
    })
    public title: string;


    @ApiProperty({
        example: '0',
        description: 'The reservation count of the category',
    })
    public uniqCode: string;

  
    @ApiProperty({
        example: 'FALSE',
        description: 'Is the category still active or archived',
    })
    public archived: boolean;

    @ApiProperty({
        example: '22/10/2025',
        description:  'The date of the category is posted on the system',
    })
    public datePosted: string;

    @ApiProperty({
        example: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        description:  'The description of the category',
    })
    public description: string;

    @ApiProperty({
        example: 'Author Test',
        description:  'The author of the category',
    })
    public author: string;
    

}