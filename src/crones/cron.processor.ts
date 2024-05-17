import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { INVERSIFY_TYPES } from "../constants/inversify.types";
import { ICurrencyService } from "../modules/currency/currency.service";
import { ISubscriptionService } from "../modules/subscription/subscription.service";
import { INodemailerService } from "../nodemailer/nodemailer.service";
import { schedule } from "node-cron";
import { IBaseCrone } from "../common/base.crone";
import { LoggerService } from '../logger/logger.service';

@injectable()
export class NotifyRateCrone implements IBaseCrone {
    croneInstance: any;
    constructor(
        @inject(INVERSIFY_TYPES.ICurrencyService) private currencyService: ICurrencyService,
        @inject(INVERSIFY_TYPES.ISubscriptionService) private subscriptionService: ISubscriptionService,
        @inject(INVERSIFY_TYPES.INodemailerService) private nodemailerService: INodemailerService,
        @inject(INVERSIFY_TYPES.ILoggerService) private logger: LoggerService

    ) {}

    create() {
        this.croneInstance = schedule("*/1 * * * *", this.process.bind(this));
    }

    async process() {
        try {
            const subscriptions = await this.subscriptionService.getAll();
            const usdRate = await this.currencyService.getRate();
            const sendMailPromises = [];
            for (const subscription of subscriptions) {
                const payload = {
                    email: subscription.email,
                    message: `Hello! 1 USD = ${usdRate} UAH`,
                    subject: "USD to UAH rate",
                };
                this.logger.log("Send email to", subscription.email)
                sendMailPromises.push(this.nodemailerService.sendMail(payload));
            }

            await Promise.allSettled(sendMailPromises);
            this.logger.log("Emails sended")
            return true;
        } catch (error) {
            this.logger.error("Crone process", error);
            throw error;
        }
    }
}
