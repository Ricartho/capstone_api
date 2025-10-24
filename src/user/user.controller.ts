import { Body, Controller, Post,InternalServerErrorException } from "@nestjs/common";
import { UserService } from "./user.service";
import { SignupDto } from "./dto/signup.dto";
import { LoginDto } from "./dto/login.dto";
import { UserDto } from "./dto/user.dto";
import {
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';


@ApiTags('users')
@Controller('users')
export class UserController{
    
    constructor(private userService: UserService){}

    @Post('/signup')

        @ApiOperation({summary: 'Create a new User.'})
        @ApiResponse({
        status: 201,
        description: 'User create and saved in DB',
        example: '{id: "68ae92da654aae1ba5aa7f87", name: "test", email: "test@test.test}',
        })
        @ApiResponse({status: 400,description:'Error while creating new user'})

        async signUp(@Body() dto: SignupDto):Promise<UserDto>{
            try{
                return await this.userService.signUp(dto);
            }catch{
                throw new InternalServerErrorException("Error while creating new user");
            }
        }

   @Post('/login')

        @ApiOperation({summary: 'Login'})
        @ApiResponse({
        status: 200,
        description: 'User is succesfully logged in',
        example: '{access_token: "68ae92da654aae1ba5aa7f87"}',
        })
        @ApiResponse({status: 400,description:'Error while loging in the system'})

        async signIn(@Body() dto:LoginDto):Promise<{access_token: string}>{
            try{
                return await this.userService.signIn(dto);
            }catch{
                throw new InternalServerErrorException("Error while loging in the system");
            }
        }
}