import { injectable } from "inversify";
import { Logger } from "tslog";
import "reflect-metadata";

export interface ILogger {
    logger: Logger<unknown>;

    log(...args: unknown[]): void;

    error(...args: unknown[]): void;

    warn(...args: unknown[]): void;
}

@injectable()
export class LoggerService implements ILogger {
    logger: Logger<unknown>;

    constructor() {
        this.logger = new Logger({
            type: "json",
        });
    }

    log(...args: unknown[]): void {
        this.logger.info(...args);
    }
    error(...args: unknown[]): void {
        this.logger.error(...args);
    }
    warn(...args: unknown[]): void {
        this.logger.warn(...args);
    }
}
