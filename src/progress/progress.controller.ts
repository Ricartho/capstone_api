import { Controller, Get, Post,Param, Put,Delete,Body,UseGuards,InternalServerErrorException} from "@nestjs/common";
import { AuthGuard } from "src/user/auth.guard";
import { GetUserId } from "src/decorator/getUser.decorator";
import { Logger } from "@nestjs/common";
import { ProgressService } from "./progress.service";

import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';


@ApiTags('progress')
@Controller('progress')
export class ProgressController{

    constructor(private progressService: ProgressService){}

    //Add a new attended on a specific event for a specific user
    @Get('/:userId/:eventId/:eventCategory/:eventTitle')
        @ApiOperation({summary: 'New progress'})
        @ApiResponse({
        status: 200,
        description: 'New progress',
        example: 'New progress',
        })
        @ApiResponse({status: 400,description:'New progress'})

        async addProgress(@Param('eventId') eventId: string,@Param('userId') userId: string,@Param('eventCategory') 
                            eventCategory: string,@Param('eventTitle') eventTitle:string):Promise<any>{
            return await this.progressService.addProgress(userId,eventId,eventTitle,eventCategory);
        }

        
        //get the number of attented event for a specific user
        @Get('/count/:userId')
            @ApiOperation({summary: 'progress count'})
            @ApiResponse({
            status: 200,
            description: 'progress count',
            example: 'progress count',
            })
            @ApiResponse({status: 400,description:'progress count'})

            async progressCount(@Param('userId') userId: string,):Promise<any>{
                return await this.progressService.countCluster(userId);
            }

        //get the list of attented event for a specific user
        @Get('/:userId')
            @ApiOperation({summary: 'progress count'})
            @ApiResponse({
            status: 200,
            description: 'progress count',
            example: 'progress count',
            })
            @ApiResponse({status: 400,description:'progress count'})

            async progressList(@Param('userId') userId: string,):Promise<any>{
                return await this.progressService.listCluster(userId);
            }

        
}