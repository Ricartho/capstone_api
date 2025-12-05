import { Injectable, ConflictException, UnauthorizedException,NotFoundException} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Logger } from "@nestjs/common";
import { Category } from "./entity/category.schema";
import { AddCategoryDto } from "./dto/addCategory.dto";
import { CategoryDto } from "./dto/category.dto";
import { UpdateCategoryDto } from "./dto/updateCategory.dto";


@Injectable()
export class CategoryService{

    //import the category model in the whole class
    constructor(@InjectModel(Category.name) private CategoryModel: Model<Category>,){}
    

    //display all Categories from the DB
    async getAllCategories():Promise<any>{

        Logger.log("get all Categories action reached");
        
        //retreive all category from DB
        const categoriesFromDB = await this.CategoryModel.find({}).sort({datePosted: 'desc'});

        Logger.log(categoriesFromDB);
        return categoriesFromDB;  

    }


     //get a specific category from DB using ID
    
    async getCategoryById(categoryId: string):Promise<CategoryDto>{
    
        Logger.log(`Updating Category with ID: '${categoryId}'`);
    
        const categoryFromDB = await this.CategoryModel.findById(categoryId).exec();
    
        if(!categoryFromDB){
        Logger.warn(`category not found with ID: '${categoryId}'`);
                throw new NotFoundException(`category not using this ID :' ${categoryId}' `);
              }
    
        return{
    
                    id: categoryFromDB.id,
                    title: categoryFromDB.title,
                    uniqCode: categoryFromDB.uniqCode,
                    archived: categoryFromDB.archived,
                    datePosted: categoryFromDB.datePosted,
                    description:categoryFromDB.description,
                    author: categoryFromDB.author
                    
              }
        }


        async addNewCategory(dto: AddCategoryDto): Promise<CategoryDto>{
                Logger.log("add Category action reached");
            
                const {title,uniqCode,description} = dto;
            
                const newCategoryData = {
                        title: title,
                        uniqCode:uniqCode,
                        description:description,
                            
                        }
                  
               //make sure category is uniq
               const existedCat = await this.CategoryModel.findOne({uniqCode:uniqCode},'title').exec();
                if(existedCat){
                  //if existed stop and throw error exception
                  throw new ConflictException("User with this email exists");
               }

                   
               //create and save in DB
                const newCategory = new this.CategoryModel(newCategoryData);
                await newCategory.save();
            
                return{
            
                            id: newCategory.id,
                            title: newCategory.title,
                            author: newCategory.author,
                            archived: newCategory.archived,
                            datePosted: newCategory.datePosted,
                            description:newCategory.description,
                            uniqCode: newCategory.uniqCode
            
                        };
                }



     async updateCategoryById(categoryId: string, dto: UpdateCategoryDto):Promise<CategoryDto>{
    
              Logger.log(`Updating Category with ID: '${categoryId}'`);
    
              const CategoryToUpdate = await this.CategoryModel.findById(categoryId).exec();
                 
              //verify Category exists in the DB 
              if(!CategoryToUpdate){
                Logger.warn(`Category not found with ID: '${categoryId}'`);
                throw new NotFoundException(`Category not using this ID :' ${categoryId}' `);
              }
    
              //verify that the current user of the system exist in the DB
    
    
              //verify that the current user is the author of the current Category and have rights on it
    
    
              //then update Category
              if(dto.title !== undefined) CategoryToUpdate.title = dto.title;
              if(dto.uniqCode !== undefined) CategoryToUpdate.uniqCode = dto.uniqCode;
              if(dto.archived !== undefined) CategoryToUpdate.archived = dto.archived;
              if(dto.description !== undefined) CategoryToUpdate.description = dto.description;
    
              await CategoryToUpdate.save();
    
              return{
    
                    id: CategoryToUpdate.id,
                    title: CategoryToUpdate.title,
                    uniqCode: CategoryToUpdate.uniqCode,
                    author: CategoryToUpdate.author,
                    archived: CategoryToUpdate.archived,
                    datePosted: CategoryToUpdate.datePosted,
                    description:CategoryToUpdate.description,
                    
              }
        }
    
        async deleteCategoryById(categoryId: string): Promise<any>{
          
            Logger.log(`Deleting Category with ID: '${categoryId}'`);
    
            const categoryToDelete = await this.CategoryModel.findById(categoryId).exec();
    
            //verify Category exists in the DB 
              if(!categoryToDelete){
                Logger.warn(`Category not found with ID: '${categoryId}'`);
                throw new NotFoundException(`Category not using this ID :' ${categoryId}' `);
              }
    
              //verify that the current user of the system exist in the DB
    
    
              //verify that the current user is the author of the current Category and have rights on it
    
    
              const deletedCategory = await this.CategoryModel.deleteOne({_id: categoryId});
    
              return deletedCategory;
        }
}