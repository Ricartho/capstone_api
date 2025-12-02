import { Injectable, ConflictException, UnauthorizedException,NotFoundException} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Logger } from "@nestjs/common";
import { Progress } from "./entity/progress.schema";



@Injectable()
export class ProgressService {

    //import the user model in the whole class and JWT service
    constructor(@InjectModel(Progress.name) private ProgressModel: Model<Progress>,
               
        ){}

    async addProgress(userId:string, eventId:string,eventTitle:string):Promise<any>{
                
      Logger.log("Progress action reached");

      const newProgressData = {
        id_user: userId,
        id_event: eventId,
        event_title: eventTitle
      }

      const newProgress = new this.ProgressModel(newProgressData);
      await newProgress.save();
      Logger.log("Progress action completed");
      return newProgress;
    }

    async countCluster(userId:string):Promise<any>{
        const result = await this.ProgressModel.countDocuments({id_user: userId});
        Logger.log(result);
        Logger.log("count action completed");
        return result;
    }
    async listCluster(userId:string):Promise<any>{
        const result = await this.ProgressModel.find({id_user: userId});
        Logger.log(result);
        Logger.log("count action completed");
        return result;
    }

 }