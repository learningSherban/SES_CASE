import { ContainerModule, interfaces, Container } from "inversify";
import { App } from "./app";
import { INVERSIFY_TYPES } from "./constants/inversify.types";
import { SubscriptionController } from "./modules/subscription/subscription.controller";
import { SubscriptionService } from "./modules/subscription/subscription.service";
import { SubscriptionRepository } from "./modules/subscription/subscription.repository";
import { OpenExchangeApi } from "./modules/currency/api/open-exchange.api";
import { CurrencyService } from "./modules/currency/currency.service";
import { CurrencyController } from "./modules/currency/currency.controller";
import { DatabaseService } from "./db/db.service";
import { DotenvService } from "./config/dotenv.service";
import { NotifyRateCrone } from "./crones/cron.processor";
import { NodemailerService } from "./nodemailer/nodemailer.service";
import { LoggerService } from "./logger/logger.service";

const appBindingsModule = new ContainerModule((bind: interfaces.Bind) => {
    bind<SubscriptionRepository>(INVERSIFY_TYPES.ISubscriptionRepository).to(SubscriptionRepository).inSingletonScope();
    bind<SubscriptionService>(INVERSIFY_TYPES.ISubscriptionService).to(SubscriptionService).inSingletonScope();
    bind<SubscriptionController>(INVERSIFY_TYPES.ISubscriptionController).to(SubscriptionController).inSingletonScope();
    bind<OpenExchangeApi>(INVERSIFY_TYPES.IOpenExchangeApi).to(OpenExchangeApi).inSingletonScope();
    bind<CurrencyService>(INVERSIFY_TYPES.ICurrencyService).to(CurrencyService).inSingletonScope();
    bind<CurrencyController>(INVERSIFY_TYPES.ICurrencyController).to(CurrencyController).inSingletonScope();
    bind<DatabaseService>(INVERSIFY_TYPES.IDatabaseService).to(DatabaseService).inSingletonScope();
    bind<DotenvService>(INVERSIFY_TYPES.IDotenvService).to(DotenvService).inSingletonScope();
    bind<NodemailerService>(INVERSIFY_TYPES.INodemailerService).to(NodemailerService).inSingletonScope();
    bind<NotifyRateCrone>(INVERSIFY_TYPES.INotifyRateCrone).to(NotifyRateCrone).inSingletonScope();
    bind<LoggerService>(INVERSIFY_TYPES.ILoggerService).to(LoggerService).inSingletonScope();
    bind<App>(INVERSIFY_TYPES.Application).to(App).inSingletonScope();
});

const appDIContainer = new Container();
appDIContainer.load(appBindingsModule);

export { appDIContainer };
