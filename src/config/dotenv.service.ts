import { config, DotenvParseOutput } from "dotenv";
import { inject, injectable } from "inversify";
import "reflect-metadata";

export interface IDotevnService {
    get(key: string): string;
}

@injectable()
export class DotenvService implements IDotevnService {
    private dotenvValues!: DotenvParseOutput;
    constructor() {
        const result = config();
        if (result.error) {
            console.error("Dotenv config error");
        } else {
            this.dotenvValues = result.parsed as DotenvParseOutput;
        }
    }

    get(key: string): string {
        return this.dotenvValues[key];
    }
}
