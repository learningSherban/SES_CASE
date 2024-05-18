import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { BaseController } from "../../common/base.controller";
import { INVERSIFY_TYPES } from "../../constants/inversify.types";
import { ICurrencyService } from "./currency.service";

export interface ICurrencyController extends BaseController {
    getRate(req: Request, res: Response, next: NextFunction): Promise<void>;
}

@injectable()
export class CurrencyController extends BaseController implements ICurrencyController {
    constructor(@inject(INVERSIFY_TYPES.ICurrencyService) private CurrencyService: ICurrencyService) {
        super();
        this.bindRoutes([{ method: "get", path: "/", handler: this.getRate }]);
    }

    public async getRate(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const rate = await this.CurrencyService.getRate();
            this.send(res, 200, rate);
        } catch (error) {
            this.send(res, 409, "Rate recieve error");
        }
    }
}
