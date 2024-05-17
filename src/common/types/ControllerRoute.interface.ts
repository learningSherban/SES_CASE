import { NextFunction, Request, Response, Router } from "express";

export interface IControllerRoute {
    path: string;
    method: keyof Pick<Router, 'get' | 'post' | 'put' | 'delete'>;
    handler: (req: Request, res: Response, next: NextFunction) => void;
    middlewares?: []
}