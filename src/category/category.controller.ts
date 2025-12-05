import { Controller, Get, Post,Param, Put,Delete,Body,UseGuards,InternalServerErrorException} from "@nestjs/common";
import { AuthGuard } from "src/user/auth.guard";
import { GetUserId } from "src/decorator/getUser.decorator";
import { Logger } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CategoryDto } from "./dto/category.dto";
import { AddCategoryDto } from "./dto/addCategory.dto";
import { UpdateCategoryDto } from "./dto/updateCategory.dto";
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';



@ApiTags('categories')
@Controller('categories')
export class CategoryController{

    constructor(private categoryService: CategoryService){}

    //get all categories
    @Get()

        @ApiOperation({summary: 'Get all categories from DB'})
        @ApiResponse({
        status: 200,
        description: 'All categories are retreive from DB',
        example: '[{id: "68ae92da654aae1ba5aa7f87",title: "test", category: "test"},{id: "68ae92da654aae1ba5aa7f87",title: "test2", category: "test"}]',
        })
        @ApiResponse({status: 400,description:'Error while getting categories'})

        async getAllcategories():Promise<any>{
            try{
                return await this.categoryService.getAllCategories();
            }catch{
                throw new InternalServerErrorException("Error while accessing categories");
            }
          
        }



    //get a single category from Db using ID
    @Get(':id')

        @ApiOperation({summary: 'Get a specific category from DB'})
        @ApiResponse({
        status: 200,
        description: 'The category is retreived from DB',
        example: '[{id: "68ae92da654aae1ba5aa7f87",title: "test", category: "test"}]',
        })
        @ApiResponse({status: 400,description:'Error while getting categories'})

        async getEvent(@Param('id') categoryId: string):Promise<CategoryDto>{
            try{
                return await this.categoryService.getCategoryById(categoryId)
            }catch{
                throw new InternalServerErrorException("Error while accessing categories");
            }
        }

    //add new category
    //the 3 following methods are LINKED to USERS through GetUserID(), need a current users on the system. Related to JWT as well, 
    // look register and login methods //IMPORTANT
    @Post()

        @ApiOperation({summary: 'Create a new category.'})
        @ApiResponse({
            status: 201,
            description: 'Event create and saved in DB',
            example: '{id: "68ae92da654aae1ba5aa7f87",title: "test", category: "test"}',
        })
        @ApiResponse({status: 400,description:'Error while creating new category'})

        async addNewEvent(@Body() dto: AddCategoryDto): Promise<CategoryDto>{
            try{
                Logger.log("User creation action reached");
                return await this.categoryService.addNewCategory(dto);
            }catch{
                throw new InternalServerErrorException("Error while accessing categories");
            }
            
        }


    //Updade a single category by ID
    @Put(':id')

        @ApiOperation({summary: 'Update existing category.'})
        @ApiResponse({
            status: 201,
            description: 'Event updated and saved in DB',
            example: '{id: "68ae92da654aae1ba5aa7f87",title: "test", category: "test"}',
            })
        @ApiResponse({status: 400,description:'Error while creating new category'})

        async updateEvent(@Param('id') categoryId: string, @Body() updateCategoryDto: UpdateCategoryDto):Promise<CategoryDto>{
            try{
                return await this.categoryService.updateCategoryById(categoryId,updateCategoryDto);
            }catch{
                throw new InternalServerErrorException("Error while updating the category");
            }
          }


    //delete a single using ID
    @Delete(':id')
        
        // @UseGuards(AuthGuard)
        // @ApiBearerAuth()
        @ApiOperation({summary: 'Delete existing category.'})
        @ApiResponse({
            status: 201,
            description: 'Event deleted from DB',
            example: '{id: "68ae92da654aae1ba5aa7f87",title: "test", category: "test"}',
         })
        @ApiResponse({status: 400,description:'Error while deleting category'})

        async deleteEvent(@Param('id') categoryId:string):Promise<any>{
            try{
                return await this.categoryService.deleteCategoryById(categoryId);
            }catch{
                throw new InternalServerErrorException("Error while updating the category");
            }
        }

       

}