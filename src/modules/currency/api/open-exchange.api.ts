import { injectable } from 'inversify';
import 'reflect-metadata';
import { BaseAxiosApi, IRequestConfig } from "../../../common/base-axios.api";

export interface IExchangeApi extends BaseAxiosApi {
    getRate(targetCurrency: string): Promise<number | null>;
}

@injectable()
export class OpenExchangeApi extends BaseAxiosApi implements IExchangeApi {
    constructor() {
        super();
        this.baseURL = "https://openexchangerates.org";
        this.authorization = "b54487d2ef2c47089ec5ad5c642d3beb";
    }

    async getRate(targetCurrency:  string): Promise<number | null> {
        try {
            const config: IRequestConfig = {
                method: "get",
                url: `/api/latest.json?&symbols=${targetCurrency}`,
            };
            const res = (await this.request(config)) as any;

            return res.data.rates[targetCurrency];
        } catch (error) {
            throw error;
        }
    }
}
