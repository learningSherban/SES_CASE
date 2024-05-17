import express, { Application } from "express";
import { Server } from "http";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { json } from "body-parser";
import { INVERSIFY_TYPES } from "./constants/inversify.types";
import { ISubscriptionController } from "./modules/subscription/subscription.controller";
import { ICurrencyController } from "./modules/currency/currency.controller";
import SubscriptionModel from "./modules/subscription/Subscription.model";
import { IDatabaseService } from "./db/db.service";
import { NotifyRateCrone } from "./crones/cron.processor";
import { LoggerService } from "./logger/logger.service";

@injectable()
export class App {
    app: Application;
    server!: Server;
    port: number;
    constructor(
        @inject(INVERSIFY_TYPES.ISubscriptionController) private subscriptionController: ISubscriptionController,
        @inject(INVERSIFY_TYPES.ICurrencyController) private currencyController: ICurrencyController,
        @inject(INVERSIFY_TYPES.IDatabaseService) private databaseService: IDatabaseService,
        @inject(INVERSIFY_TYPES.INotifyRateCrone) private notifyRateCrone: NotifyRateCrone,
        @inject(INVERSIFY_TYPES.ILoggerService) private logger: LoggerService
    ) {
        this.app = express();
        this.port = 3000;
    }

    private useRoutes() {
        this.app.use("/subscribe", this.subscriptionController.router);
        this.app.use("/rate", this.currencyController.router);
    }

    private useMiddlewares() {
        this.app.use(json());
    }

    private useCrones() {
        this.notifyRateCrone.create()
    }

    public async init() {
        try {
            this.server = this.app.listen(this.port);
            await this.databaseService.connect();
            this.databaseService.initModels([SubscriptionModel]);
            this.useMiddlewares();
            this.useRoutes();
            this.useCrones();

            this.logger.log(`Server has been started on port ${this.port}`);
        } catch (error) {
            this.logger.error("Init app error", error);
        }
    }
}
