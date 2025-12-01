import { Body, Controller, Post,UseGuards,InternalServerErrorException, Logger, Put, Param, Delete, Get } from "@nestjs/common";
import { AuthGuard } from "./auth.guard";
import { UserService } from "./user.service";
import { SignupDto } from "./dto/signup.dto";
import { LoginDto } from "./dto/login.dto";
import { UserDto } from "./dto/user.dto";
import { AddUserDto } from "./dto/addUser.dto";
import { UpdateUserDto } from "./dto/updateUser.dto";
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';


@ApiTags('users')
@Controller('auth')
export class UserController{
    
    constructor(private userService: UserService){}

    //get all users from DB
    @Get('/users')
    
      @ApiOperation({summary: 'Get all users from DB'})
      @ApiResponse({
        status: 200,
        description: 'The event is retreived from DB',
        example: '[{id: "68ae92da654aae1ba5aa7f87",fname: "test", lname: "test"},{id: "68ae92da654aae1ba5aa7f87",fname: "test2", lname: "test"}]',
        })
      @ApiResponse({status: 400,description:'Error while getting users'})
   
      async getAllUsers():Promise<any>{

        try{
            return await this.userService.getAllUsers();
        }catch(e){
            throw new InternalServerErrorException("Error while accessing users");
        }
     }

     @Get('/users/:id')
       @ApiOperation({summary: 'Get a specific user from DB'})
        @ApiResponse({
        status: 200,
        description: 'The user is retreived from DB',
        example: '{id: "68ae92da654aae1ba5aa7f87",fname: "test", lname: "test"}',
        })
        @ApiResponse({status: 400,description:'Error while getting user'})

        async getEvent(@Param('id') userId: string):Promise<UserDto>{
            try{
                return await this.userService.getUserById(userId);
               }catch{
                 throw new InternalServerErrorException("Error while accessing events");
            }
        }



    @Post('/register')
        @ApiOperation({summary: 'Create a new User (SIGN UP).'})
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

        async signIn(@Body() dto:LoginDto):Promise<{access_token: string,user_id:string}>{
            try{
                return await this.userService.signIn(dto);
                
            }catch{
                throw new InternalServerErrorException("Error while loging in the system");
            }
        }


    //create user

     @Post('/users')   

        @ApiOperation({summary: 'Create a new user. (ADMIN WAY)'})
        @ApiResponse({
            status: 201,
            description: 'User create and saved in DB',
            example: '{id: "68ae92da654aae1ba5aa7f87",fname: "test", lname: "test"}',
        })
        @ApiResponse({status: 400,description:'Error while creating new user'})
        async createUser(@Body() dto: AddUserDto):Promise<UserDto>{
            try{
                return await this.userService.addNewUser(dto);
            }catch(e){
                 throw new InternalServerErrorException("Error while creating user",e);
            }
        }

        //update user

       @Put('/users/:id') 

        @ApiOperation({summary: 'Update an user.'})
        @ApiResponse({
            status: 201,
            description: 'User updated and saved in DB',
            example: '{id: "68ae92da654aae1ba5aa7f87",fname: "test", lname: "test"}',
        })
        @ApiResponse({status: 400,description:'Error while updating user'})

       async updateUser(@Param('id') userId: string,@Body() dto: UpdateUserDto):Promise<UserDto>{
            try{
                return await this.userService.updateUserById(userId,dto);
            }catch(e){
              throw new InternalServerErrorException("Error while updating user");
            }
       }

       //delete user

       @Delete('/users/:id')

       @ApiOperation({summary: 'Delete existing user.'})
        @ApiResponse({
            status: 201,
            description: 'user deleted from DB',
            example: '{id: "68ae92da654aae1ba5aa7f87",fname: "test", lname: "test"}',
         })
        @ApiResponse({status: 400,description:'Error while deleting user'})

       async deleteUser(@Param('id') userID: string):Promise<any>{
            try{
                await this.userService.deleteUserById(userID);
            }catch(e){
                throw new InternalServerErrorException("Error while delating user");
            }
       }
}