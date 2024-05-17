import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { Transporter, createTransport } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

interface IMailPayload {
    message: string;
    subject: string;
    email: string;
}

export interface INodemailerService {
    mailerClient: Transporter;
    sendMail({ message, subject, email }: IMailPayload): Promise<false | SMTPTransport.SentMessageInfo>;
}

@injectable()
export class NodemailerService {
    private mailerClient = createTransport({
        service: "gmail",
        auth: {
            user: "softwareschool19@gmail.com",
            pass: "QWEasdzxc123",
        },
    });

    public async sendMail({ message, subject, email }: IMailPayload) {
        try {
            const mailOptions = {
                from: "softwareschool19@gmail.com",
                to: email,
                subject: subject,
                text: message,
            };
            
            return this.mailerClient.sendMail(mailOptions);
        } catch (error) {
            console.log("Send mail error", error);
            return false;
        }
    }
}
