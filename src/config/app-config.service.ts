import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"

@Injectable()
export class Appconfig {
    constructor(private readonly configService: ConfigService){}

    public get appPort(): number {
        return this.configService.get<number>('PORT') || 3000;
   
    }
}