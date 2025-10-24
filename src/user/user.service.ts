import { Injectable, ConflictException, UnauthorizedException} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Logger } from "@nestjs/common";
import { User } from "./entity/user.schema";
import { UserDto } from "./dto/user.dto";
import { SignupDto } from "./dto/signup.dto";
import { LoginDto } from "./dto/login.dto";



@Injectable()
export class UserService {

    //import the user model in the whole class and JWT service
    constructor(@InjectModel(User.name) private UserModel: Model<User>,
                private jwtService : JwtService,
        ){}


    //method for new user sign up
    async signUp(dto: SignupDto): Promise<UserDto>{

        Logger.log("Sign Up action reached");

        const {name,email,password} = dto;

        //verify if there's a existed account already
        const existedUser = await this.UserModel.findOne({email:email},'name').exec();

        if(existedUser){
            //if existed stop and throw error exception
            throw new ConflictException("User with this email exists");
        }

        //password hashing
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUserData = {
            name: name,
            email: email,
            password: hashedPassword,
            admin: false,
            active:false,
        }

        //send to DB and save
        const newUser = new this.UserModel(newUserData);

        await newUser.save();

        //return value correpond to the promise format
        return {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            admin: newUser.admin,
            active: newUser.active,
        };
    }

    //method for user login
    async signIn(dto: LoginDto):Promise<{access_token: string}> {

        Logger.log("Sign In action reached");

        const {email,password} = dto;

        const loggedUser = await this.UserModel.findOne({email:email},'id name password').exec();

        if(loggedUser){
            const isPassMatch = await bcrypt.compare(password,loggedUser.password);
      
            if(isPassMatch){
                // return loggedUser;
                const payload = {sub: loggedUser.id, username: loggedUser.email};
                return {
                    access_token : await this.jwtService.signAsync(payload),
                };
            }
        }
        
       throw new UnauthorizedException("Invalid Password");
        
   }
}