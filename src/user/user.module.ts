import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User,UserSchema } from "./entity/user.schema";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { JwtModule, JwtModuleAsyncOptions } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from '@nestjs/config';




@Module({
    imports:[
        MongooseModule.forFeature([{name:User.name, schema:UserSchema}]),
        JwtModule.registerAsync(getJwtAsyncOption()),
        ConfigModule,
    ],
    controllers:[UserController],
    providers:[UserService],
    exports: [UserService],
})


export class UserModule{}

function getJwtAsyncOption(): JwtModuleAsyncOptions{
    return{
        imports:[ConfigModule],
        useFactory: async(configService: ConfigService) => {
            return{
                secret: configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
                signOptions:{
                        expiresIn: configService.get<string>('JWT_ACCESS_TOKEN_EXPIRES_IN'),
                        algorithm: 'HS512',
                    }
         }
       },
       inject: [ConfigService],
    };
}