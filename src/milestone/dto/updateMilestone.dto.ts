import { ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateMilestoneDto {

    @ApiPropertyOptional({
        example: 'Milestone title',
        description: 'The title of the Milestone',
        })
        public title?: string;


    @ApiPropertyOptional({
        example: 'Milestone category',
        description: 'The category of the Milestone',
         })
        public category?: string;
     
     
    @ApiPropertyOptional({
        example: '0',
        description: 'The reservation count of the Milestone',
         })
        public criteria?: number;
     

    @ApiPropertyOptional({
        example: 'FALSE',
        description: 'Is the Milestone still active or archived',
         })
        public archived?: boolean;

    @ApiPropertyOptional({
        example: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        description: 'The description of the Milestone',
      })
        public description: string;

}