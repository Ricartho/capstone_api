import { Injectable, ConflictException, UnauthorizedException,NotFoundException} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Logger } from "@nestjs/common";
import { Milestone } from "./entity/milestone.schema";
import { AddMilestoneDto } from "./dto/addMilestone.dto";
import { MilestoneDto } from "./dto/milestone.dto";
import { UpdateMilestoneDto } from "./dto/updateMilestone.dto";



@Injectable()
export class MilestoneService{

    //import the milestone model in the whole class
    constructor(@InjectModel(Milestone.name) private MilestoneModel: Model<Milestone>,){}
    
    async addNewMilestone(dto: AddMilestoneDto): Promise<MilestoneDto>{
                Logger.log("add Milestone action reached");
    
                const {title,criteria,category,description} = dto;
    
                const newMilestoneData = {
                    title: title,
                    category: category,
                    criteria: criteria,
                    description:description,
                    
                }
    
                //create and save in DB
                const newMilestone = new this.MilestoneModel(newMilestoneData);
                await newMilestone.save();
    
                return{
    
                    id: newMilestone.id,
                    title: newMilestone.title,
                    category: newMilestone.category,
                    criteria: newMilestone.criteria,
                    author: newMilestone.author,
                    archived: newMilestone.archived,
                    datePosted: newMilestone.datePosted,
                    description:newMilestone.description,
    
                };
        }


  //display all milestones from the DB
    async getAllMilestones():Promise<any>{

        Logger.log("get all milestones action reached");
        
        //retreive all milestone from DB
        const milestonesFromDB = await this.MilestoneModel.find({}).sort({datePosted: 'desc'});

        Logger.log(milestonesFromDB);
        return milestonesFromDB;  

    }

        //get a specific milestone from DB using ID
    
        async getMilestoneById(milestoneId: string):Promise<MilestoneDto>{
    
              Logger.log(`Updating Extension with ID: '${milestoneId}'`);
    
              const milestoneFromDB = await this.MilestoneModel.findById(milestoneId).exec();
    
              if(!milestoneFromDB){
                Logger.warn(`milestone not found with ID: '${milestoneId}'`);
                throw new NotFoundException(`milestone not using this ID :' ${milestoneId}' `);
              }
    
              return{
    
                    id: milestoneFromDB.id,
                    title: milestoneFromDB.title,
                    category: milestoneFromDB.category,
                    criteria: milestoneFromDB.criteria,
                    author:milestoneFromDB.author,
                    archived: milestoneFromDB.archived,
                    datePosted: milestoneFromDB.datePosted,
                    description:milestoneFromDB.description,
                    
              }
        }




            async updateMilestoneById(milestoneId: string, dto: UpdateMilestoneDto):Promise<MilestoneDto>{
        
                  Logger.log(`Updating Milestone with ID: '${milestoneId}'`);
        
                  const MilestoneToUpdate = await this.MilestoneModel.findById(milestoneId).exec();
                     
                  //verify Milestone exists in the DB 
                  if(!MilestoneToUpdate){
                    Logger.warn(`Milestone not found with ID: '${milestoneId}'`);
                    throw new NotFoundException(`Milestone not using this ID :' ${milestoneId}' `);
                  }
        
                  //verify that the current user of the system exist in the DB
        
        
                  //verify that the current user is the author of the current Milestone and have rights on it
        
        
                  //then update Milestone
                  if(dto.title !== undefined) MilestoneToUpdate.title = dto.title;
                  if(dto.category !== undefined) MilestoneToUpdate.category = dto.category;
                  if(dto.criteria !== undefined) MilestoneToUpdate.criteria = dto.criteria;
                  if(dto.archived !== undefined) MilestoneToUpdate.archived = dto.archived;
                  if(dto.description !== undefined) MilestoneToUpdate.description = dto.description;
        
                  await MilestoneToUpdate.save();
        
                  return{
        
                        id: MilestoneToUpdate.id,
                        title: MilestoneToUpdate.title,
                        category: MilestoneToUpdate.category,
                        criteria: MilestoneToUpdate.criteria,
                        author:MilestoneToUpdate.author,
                        archived: MilestoneToUpdate.archived,
                        datePosted: MilestoneToUpdate.datePosted,
                        description:MilestoneToUpdate.description,
                        
                  }
            }

    async deleteMilestoneById(milestoneId: string): Promise<any>{
      
        Logger.log(`Deleting Milestone with ID: '${milestoneId}'`);

        const MilestoneToDelete = await this.MilestoneModel.findById(milestoneId).exec();

        //verify Milestone exists in the DB 
          if(!MilestoneToDelete){
            Logger.warn(`Milestone not found with ID: '${milestoneId}'`);
            throw new NotFoundException(`Milestone not using this ID :' ${milestoneId}' `);
          }

          //verify that the current user of the system exist in the DB


          //verify that the current user is the author of the current Milestone and have rights on it


          const deletedMilestone = await this.MilestoneModel.deleteOne({_id: milestoneId});

          return deletedMilestone;
    }

 
}