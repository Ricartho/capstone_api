import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Progress,ProgressSchema } from "./entity/progress.schema";
import { ProgressController } from "./progress.controller";
import { ProgressService } from "./progress.service";
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports:[
        MongooseModule.forFeature([{name:Progress.name, schema:ProgressSchema},
    ]),
    ],
    controllers:[ProgressController],
    providers:[ProgressService],
    
})

export class ProgressModule{}