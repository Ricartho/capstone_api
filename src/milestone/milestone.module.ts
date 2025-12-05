import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from '../user/user.module'
import { Milestone,MilestoneSchema } from "./entity/milestone.schema";
import { MilestoneController } from "./milestone.controller";
import { MilestoneService } from "./milestone.service";

import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports:[
        MongooseModule.forFeature([{name:Milestone.name, schema:MilestoneSchema},
    ]),
    ],
    controllers:[MilestoneController],
    providers:[MilestoneService],
    
})

export class MilestoneModule{}