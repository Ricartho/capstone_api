import { ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateCategoryDto {

    @ApiPropertyOptional({
        example: 'category title',
        description: 'The title of the category',
        })
        public title?: string;
     
    @ApiPropertyOptional({
        example: '0',
        description: 'The reservation count of the category',
         })
        public uniqCode?: string;
     
   
    @ApiPropertyOptional({
        example: 'FALSE',
        description: 'Is the category still active or archived',
         })
        public archived?: boolean;

    @ApiPropertyOptional({
        example: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        description: 'The description of the category',
      })
        public description: string;

}