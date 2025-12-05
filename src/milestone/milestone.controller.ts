import { Controller, Get, Post,Param, Put,Delete,Body,UseGuards,InternalServerErrorException} from "@nestjs/common";
import { AuthGuard } from "src/user/auth.guard";
import { GetUserId } from "src/decorator/getUser.decorator";
import { Logger } from "@nestjs/common";

import { MilestoneService } from "./milestone.service";
import { AddMilestoneDto } from "./dto/addMilestone.dto";
import { MilestoneDto } from "./dto/milestone.dto";
import { UpdateMilestoneDto } from "./dto/updateMilestone.dto";
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';



@ApiTags('milestones')
@Controller('milestones')
export class MilestoneController{

    constructor(private milestoneService: MilestoneService){}

      //Updade a single Milestone by ID
    @Put(':id')
    
      @ApiOperation({summary: 'Update existing Milestone.'})
      @ApiResponse({
            status: 201,
            description: 'Milestone updated and saved in DB',
            example: '{id: "68ae92da654aae1ba5aa7f87",title: "test", category: "test"}',
                })
      @ApiResponse({status: 400,description:'Error while creating new Milestone'})
    
            async updateMilestone(@Param('id') milestoneId: string, @Body() updateMilestoneDto: UpdateMilestoneDto):Promise<MilestoneDto>{
                try{
                    return await this.milestoneService.updateMilestoneById(milestoneId,updateMilestoneDto);
                }catch{
                    throw new InternalServerErrorException("Error while updating the Milestone");
                }
              }

     //get all Milestones
    @Get()

        @ApiOperation({summary: 'Get all Milestones from DB'})
        @ApiResponse({
        status: 200,
        description: 'All Milestones are retreive from DB',
        example: '[{id: "68ae92da654aae1ba5aa7f87",title: "test", category: "test"},{id: "68ae92da654aae1ba5aa7f87",title: "test2", category: "test"}]',
        })
        @ApiResponse({status: 400,description:'Error while getting Milestones'})

        async getAllMilestones():Promise<any>{
            try{
                return await this.milestoneService.getAllMilestones();
            }catch{
                throw new InternalServerErrorException("Error while accessing Milestones");
            }
          
        }


           //get a single milestone from Db using ID
     @Get(':id')
        
       @ApiOperation({summary: 'Get a specific milestone from DB'})
       @ApiResponse({
       status: 200,
       description: 'The milestone is retreived from DB',
       example: '[{id: "68ae92da654aae1ba5aa7f87",title: "test", category: "test"}]',
                })
       @ApiResponse({status: 400,description:'Error while getting milestones'})
        
       async getMilestone(@Param('id') milestoneId: string):Promise<MilestoneDto>{
            try{
                return await this.milestoneService.getMilestoneById(milestoneId)
            }catch{
                throw new InternalServerErrorException("Error while accessing milestones");
                    }
                }
    
    

    @Post()
                
        @ApiOperation({summary: 'Create a new Milestone.'})
        @ApiResponse({
            status: 201,
            description: 'Milestone create and saved in DB',
            example: '{id: "68ae92da654aae1ba5aa7f87",title: "test", category: "test"}',
            })
        @ApiResponse({status: 400,description:'Error while creating new Milestone'})
                
         async addNewMilestone(@Body() dto: AddMilestoneDto): Promise<MilestoneDto>{
            try{
                Logger.log("User creation action reached");
                return await this.milestoneService.addNewMilestone(dto);
                }catch{
                    throw new InternalServerErrorException("Error while accessing Milestones");
                }
                            
            }


//delete a single using ID
    @Delete(':id')
        
        // @UseGuards(AuthGuard)
        // @ApiBearerAuth()
        @ApiOperation({summary: 'Delete existing Milestone.'})
        @ApiResponse({
            status: 201,
            description: 'Milestone deleted from DB',
            example: '{id: "68ae92da654aae1ba5aa7f87",title: "test", category: "test"}',
         })
        @ApiResponse({status: 400,description:'Error while deleting Milestone'})

        async deleteMilestone(@Param('id') milestoneId:string):Promise<any>{
            try{
                return await this.milestoneService.deleteMilestoneById(milestoneId);
            }catch{
                throw new InternalServerErrorException("Error while updating the Milestone");
            }
        }


       

}