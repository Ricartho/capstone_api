import { Injectable, ConflictException, UnauthorizedException,NotFoundException,InternalServerErrorException,Redirect} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Logger } from "@nestjs/common";
import { User } from "./entity/user.schema";
import { UserDto } from "./dto/user.dto";
import { AddUserDto } from "./dto/addUser.dto";
import { UpdateUserDto } from "./dto/updateUser.dto";
import { SignupDto } from "./dto/signup.dto";
import { LoginDto } from "./dto/login.dto";
import { MyMailerService } from "src/mailer/mailer.service";
import { SrvRecord } from "dns";






@Injectable()
export class UserService {

    //import the user model in the whole class and JWT service
    constructor(@InjectModel(User.name) private UserModel: Model<User>,
                private jwtService : JwtService,
                private  myMailerService : MyMailerService,
        ){}

    async verifAccount(token :string):Promise<any> {
        Logger.log("verif action reached");
        Logger.log(token);
       
        //verify if there's a existed account already
        const existedUser = await this.UserModel.findOne({verificationToken:token},'fName verificationToken').exec();
        try{
            if(existedUser){
                existedUser.active = true;
                await existedUser.save();            
            }
        }catch(e){
            Logger.log(e);
            throw new InternalServerErrorException("Error while saving new user in DB");
        }
        return existedUser;
    }
    
     async verifAccount2(token :string):Promise<any> {
        Logger.log("verif action reached");
        Logger.log(token);
       
        //verify if there's a existed account already
        const existedUser = await this.UserModel.findOne({passwordResetToken:token},'passwordResetToken').exec();
        try{
            if(existedUser){
               return existedUser;           
            }
        }catch(e){
            Logger.log(e);
            throw new InternalServerErrorException("Error while saving new user in DB");
        }
        return existedUser;
    }

    async changePasswordLink(email):Promise<any>{
        Logger.log(" Reset Password link action reached");
        //verify if there's a existed account already
    
        Logger.log(email.email);
        const existedUser = await this.UserModel.findOne({email:email.email},'fName').exec();
        Logger.log(existedUser);

         if(!existedUser){
            //if existed stop and throw error exception
            Logger.log("error1");
            throw new NotFoundException("No User with this email exists");
        }

         //generate random token value for mail verif with email provided
        const cipher = crypto.randomUUID();

        existedUser.passwordResetToken = cipher;

        try{
            await existedUser.save();
             //send verification mail to registered user.
            const verification_link = `http://localhost:3000/api/auth/reset-password/${cipher}`;
            await  this.myMailerService.sendResetPasswordEmail(email.email,email.email,verification_link);
            Logger.log("Mail action completed");
            return existedUser;
        }catch(e){
            Logger.log("Error while reseting password");
            throw new InternalServerErrorException("Error while reseting password");
        }
    }

    async updatePassword(token :string,password :string):Promise<any>{
        //verify if there's a existed account already
        const existedUser = await this.UserModel.findOne({passwordResetToken:token}).exec();
        Logger.log(existedUser);
         if(!existedUser){
            //if existed stop and throw error exception
            Logger.log("fout");
            throw new NotFoundException("This token is incorrect or expired");
        }
            //password hashing
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password,salt);
           existedUser.password = hashedPassword;
           
            
            
          try{
            
            await existedUser.save();
            Logger.log(existedUser);
            Logger.log("Password change completed");

            //send verification mail to registered user.
           
            Logger.log("Mail action completed");
            return existedUser;

        }catch(e){
            Logger.log(e);
            throw new InternalServerErrorException("Error while saving new user in DB");
        }

        
    }
    //method for new user sign up
    async signUp(dto: SignupDto): Promise<UserDto>{

        Logger.log("Sign Up action reached");

        // const {studentNB,email,password} = dto;
        const {fName,lName,email,password} = dto;

        //verify if there's a existed account already
        const existedUser = await this.UserModel.findOne({email:email},'fName').exec();

        if(existedUser){
            //if existed stop and throw error exception
            throw new ConflictException("User with this email exists");
        }

        //password hashing
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password,salt);

        //generate random token value for mail verif with email provided
        const cipher = crypto.randomUUID();
        

        //prepare data structure to save in DB
        const newUserData = {
            fName:fName,
            lName: lName,
            email: email,
            password: hashedPassword,
            verificationToken: cipher,
        }

        //send to DB and save
        const newUser = new this.UserModel(newUserData);
        // newUser.loginCount = 1;
        try{

            await newUser.save();
            Logger.log("Sign Up action completed");

            //send verification mail to registered user.
            const verification_link = `http://localhost:3000/api/auth/verif/${cipher}`;
            await  this.myMailerService.sendVerificationEmail(email,email,verification_link);
            Logger.log("Mail action completed");

        }catch(e){
            Logger.log(e);
            throw new InternalServerErrorException("Error while saving new user in DB");
        }

      
        //return value correpond to the promise format
        return {
            id: newUser.id,
            fName:newUser.fName,
            lName:newUser.lName,
            email: newUser.email,
            author:newUser.author,
            admin: newUser.admin,
            active: newUser.active,
            loginCount: newUser.loginCount,
        };
    }

    //method for user login
    async signIn(dto: LoginDto):Promise<{access_token: string,user_id:string,user_admin:boolean,active:boolean}> {

        Logger.log("Sign In action reached");

        const {email,password} = dto;

        const loggedUser = await this.UserModel.findOne({email:email},'id email password loginCount admin active').exec();

        if(loggedUser){
            const isPassMatch = await bcrypt.compare(password,loggedUser.password);
      
            if(isPassMatch){
                // return loggedUser;
                let payload = {sub: loggedUser.id, username: loggedUser.email};
                loggedUser.loginCount = loggedUser.loginCount + 1;
                loggedUser.save();
                Logger.log("Sign In action completed",loggedUser.admin);
                return {
                    access_token : await this.jwtService.signAsync(payload),
                    user_id: loggedUser.id,
                    user_admin: loggedUser.admin,
                    active: loggedUser.active
                    
                };
            }
        }
         
       throw new UnauthorizedException("Invalid Password");
        
   }

   //method to create a new user

   async addNewUser(dto:AddUserDto):Promise<UserDto>{

        Logger.log("User creation action reached");

        const {fName,lName,email,admin,password} = dto;

        //verify if there's a existed account already
        const existedUser = await this.UserModel.findOne({email:email},'name').exec();

        if(existedUser){
            //if existed stop and throw error exception
            throw new ConflictException("User with this email exists");
        }

        //password hashing
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password,salt);

        //generate random token value for mail verif with email provided
        const cipher = crypto.randomUUID();

        const newUserData = {
            fName: fName,
            lName:lName,
            email: email,
            password: hashedPassword,
            admin:admin,
             verificationToken: cipher,
        };

        //create and save in DB

        const newUser = new this.UserModel(newUserData);
        try{
            await newUser.save();
             //send verification mail to registered user.
            const verification_link = `http://localhost:3000/api/auth/verif/${cipher}`;
            await  this.myMailerService.sendVerificationEmail(email,email,verification_link);
            Logger.log("Mail action completed");
        }catch(e){
            Logger.log(e);
            throw new InternalServerErrorException("Error while saving new user in DB");
        }
     

        return{
            id: newUser.id,
            fName:newUser.fName,
            lName:newUser.lName,
            email: newUser.email,
            author:newUser.author,
            admin: newUser.admin,
            active: newUser.active,
            loginCount: newUser.loginCount,
        }
   }

   async getAllUsers():Promise<any>{

      Logger.log("get all users action reached");

           //retreive all event from DB
        const usersFromDB = await this.UserModel.find({}).sort({datePosted: 'desc'});

        Logger.log(usersFromDB);
        return usersFromDB; 
   }

   async updateUserById(userId: string, dto: UpdateUserDto):Promise<UserDto>{

       Logger.log(`Updating Extension with ID: '${userId}'`);

       const userToUpdate = await this.UserModel.findById(userId).exec();
                    
        //verify event exists in the DB 
        if(!userToUpdate){
            Logger.warn(`Event not found with ID: '${userId}'`);
            throw new NotFoundException(`Event not using this ID :' ${userId}' `);
            }
        
        //start update action
        if(dto.fName !== undefined) userToUpdate.fName = dto.fName;
        if(dto.lName !== undefined) userToUpdate.lName = dto.lName;
        if(dto.email !== undefined) userToUpdate.email = dto.email;
        if(dto.admin !== undefined) userToUpdate.admin = dto.admin;
        if(dto.password !== undefined) userToUpdate.password = dto.password;

        await userToUpdate.save();

        return{
            id: userToUpdate.id,
            fName:userToUpdate.fName,
            lName:userToUpdate.lName,
            email: userToUpdate.email,
            author:userToUpdate.author,
            admin: userToUpdate.admin,
            active: userToUpdate.active,
            loginCount: userToUpdate.loginCount,
        }
   }

   async deleteUserById(userId: string):Promise<any>{

     Logger.log(`Deleting user with ID: '${userId}'`);

         const userToDelete = await this.UserModel.findById(userId).exec();

        //verify user exists in the DB 
          if(!userToDelete){
            Logger.warn(`Event not found with ID: '${userId}'`);
            throw new NotFoundException(`Event not using this ID :' ${userId}' `);
          }

          const deletedUser = await this.UserModel.deleteOne({_id: userId});

          return deletedUser;

   }

   async getUserById(userId: string):Promise<UserDto>{

    Logger.log(`Updating Extension with ID: '${userId}'`);
     const userFromDB = await this.UserModel.findById(userId).exec();

     if(!userFromDB){
        Logger.warn(`Event not found with ID: '${userId}'`);
        throw new NotFoundException(`Event not using this ID :' ${userId}' `);
     }
    return {
        id: userFromDB.id,
        fName: userFromDB.fName,
        lName: userFromDB.lName,
        email: userFromDB.email,
        author: userFromDB.author,
        admin: userFromDB.admin,
        active: userFromDB.active,
        loginCount: userFromDB.loginCount
    };
   }
}