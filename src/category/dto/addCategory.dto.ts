import { ApiProperty } from "@nestjs/swagger";

export class AddCategoryDto {

    @ApiProperty({
        example: 'category title',
        description: 'The title of the category',
    })
    public title: string;


    @ApiProperty({
        example: 'category location',
        description: 'The location of the category',
    })
    public uniqCode: string;


   @ApiProperty({
        example: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        description: 'The description of the category',
    })
    public description: string;


}