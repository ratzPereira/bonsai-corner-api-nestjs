import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor(private mailService: MailerService) {}

  async sendEmail(to: string, subject: string, text: string) {
    await this.mailService.sendMail({
      to,
      from: 'ratzpereira@gmail.com',
      subject,
      text,
    });
    console.log(to)
    console.log('email sent');
  }
}
