import { Response, Router } from 'express';
import { injectable } from 'inversify';
import 'reflect-metadata';
import { IControllerRoute } from './types/ControllerRoute.interface';

@injectable()
export abstract class BaseController {
	private _router: Router;

	constructor() {
		this._router = Router();
	}

	get router(): Router {
		return this._router;
	}

	public send<T>(res: Response, statusCode: number, data: T): Response<any, Record<string, any>> {
		return res.status(statusCode).json(data);
	}

	protected bindRoutes(routes: IControllerRoute[]) {
		for (const route of routes) {
			const handler = route.handler.bind(this);
			this.router[route.method](route.path, handler);
		}
	}
}
