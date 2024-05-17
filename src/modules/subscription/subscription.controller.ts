import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { BaseController } from "../../common/base.controller";
import { TypedRequestBody } from "../../common/types/Request.interfaces";
import { CreateSubscriptionDto } from "./dto/subscription.dto";
import { INVERSIFY_TYPES } from "../../constants/inversify.types";
import { ISubscriptionService } from "./subscription.service";

export interface ISubscriptionController extends BaseController {
    create({ body }: TypedRequestBody<CreateSubscriptionDto>, res: Response, next: NextFunction): Promise<void>;
}

@injectable()
export class SubscriptionController extends BaseController implements ISubscriptionController {
    constructor(@inject(INVERSIFY_TYPES.ISubscriptionService) private subscriptionService: ISubscriptionService) {
        super();
        this.bindRoutes([{ method: "post", path: "/", handler: this.create }]);
    }

    public async create({ body }: TypedRequestBody<CreateSubscriptionDto>, res: Response, next: NextFunction): Promise<void> {
        try {
            const subscription = await this.subscriptionService.create(body);
            this.send(res, 200, subscription);
        } catch (error) {
            this.send(res, 409, "Email already exist");
        }
    }
}
