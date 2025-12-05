import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MyMailerService {
  constructor(private readonly mailerService: MailerService) {}

  async sendVerificationEmail(to: string, username: string, verificationLink: string): Promise<void> {
    await this.mailerService.sendMail({
      to: to,
      subject: 'Verify your email address',
      template: 'emailTemplate', // Name of your Handlebars/Pug template
      context: {
        username: username,
        verificationLink: verificationLink,
      },
    });
  }

  async sendResetPasswordEmail(to: string, username: string, verificationLink: string): Promise<void> {
    await this.mailerService.sendMail({
      to: to,
      subject: 'Link to reset to reset your password',
      template: 'emailTemplate', // Name of your Handlebars/Pug template
      context: {
        username: username,
        verificationLink: verificationLink,
      },
    });
  }

}