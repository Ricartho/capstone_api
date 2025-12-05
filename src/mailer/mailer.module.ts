import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'; 
import { MyMailerService } from './mailer.service';

@Module({
  imports: [
    MailerModule.forRoot({
     
      transport: {
        host: "smtp.gmail.com", 
        port: 465,
        secure: 'true', // true for 465, false for other ports
        auth: {
          user: 'ricarthoo8best@gmail.com',
          pass: 'dikx djji ydqc xrlq',
        },
      },
      defaults: {
        from: '"No Reply" <noreply@ksu-sewp.edu>', // Default sender
      },
      template: {
        dir: process.cwd() + '/src/templates', // Path to your email templates
        adapter: new HandlebarsAdapter(), // Or new PugAdapter()
        options: {
          strict: true,
        },
      },
    }),
      
  ],
   providers:[MyMailerService],
})
export class MyMailerModule {}