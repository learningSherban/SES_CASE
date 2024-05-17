import { inject, injectable } from "inversify";
import { Sequelize } from "sequelize";
import "reflect-metadata";
import { INVERSIFY_TYPES } from "../constants/inversify.types";
import { IDotevnService } from "../config/dotenv.service";

export interface IDatabaseService {
    client: Sequelize;

    connect(): Promise<void>;

    disconnect(): Promise<void>;

    initModels(models: any): void;
}

@injectable()
export class DatabaseService implements IDatabaseService {
    private _client: Sequelize;

    get client(): Sequelize {
        return this._client;
    }

    constructor(@inject(INVERSIFY_TYPES.IDotenvService) private dotenvService: IDotevnService) {
        const DB_NAME = this.dotenvService.get("DB_NAME");
        const DB_USER = this.dotenvService.get("DB_USER");
        const DB_PASSWORD = this.dotenvService.get("DB_PASSWORD");
        const DB_HOST = this.dotenvService.get("DB_HOST");
        this._client = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
            host: DB_HOST,
            dialect: "postgres",
        });
    }

    async connect(): Promise<void> {
        try {
            await this._client.authenticate();
            console.log("Database successfully connected ✅");
        } catch (error) {
            console.error("Database connection error", error);
        }
    }

    async disconnect(): Promise<void> {
        await this._client.close();
        console.log("Database successfully disconnected ❎");
    }

    initModels(models: { class: any; tableOptions: any }[]) {
        models.forEach((model) => {
            model.class.init(model.tableOptions, { sequelize: this._client });
        });
        this._client.sync();
    }
}
