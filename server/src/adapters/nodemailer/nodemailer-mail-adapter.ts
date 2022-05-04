import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "6ff6447169c08d",
      pass: "46289bd89d2edb"
    }
  });

export class NodemailMailAdapter implements MailAdapter {
    async sendMail({ subject, body }: SendMailData) {
        await transport.sendMail({
            from: 'Equipe Feedget <contato@feedget.com>',
            to: 'Rafael Albano <rafaelb.albano@gmail.com>',
            subject,
            html: body,
        });
    };
}