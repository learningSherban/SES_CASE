import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { INVERSIFY_TYPES } from '../../constants/inversify.types';
import { IExchangeApi } from './api/open-exchange.api';

export interface ICurrencyService {
  getRate(): Promise<number | null>
}

@injectable()
export class CurrencyService implements ICurrencyService {

	constructor(@inject(INVERSIFY_TYPES.IOpenExchangeApi) private openExchangeApi: IExchangeApi) {}

	public async getRate(): Promise<number | null> {
		try {
			return this.openExchangeApi.getRate("UAH");
		} catch (error) {
			throw error;
		}
	}
}
