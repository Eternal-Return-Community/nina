import { Router, type NextFunction, type Request, type Response } from "express";

type Method = 'get' | 'post' | 'put' | 'delete' | 'patch';

export default (method: Method, path: string) => {
    return (target: any, key: string, descriptor: PropertyDescriptor): PropertyDescriptor => {
        const value = descriptor.value;
        descriptor.value = function (req: Request, res: Response, next: NextFunction): any {
            const router = Router();
            router[method](path, (req: Request, res: Response) => value.apply(this, [req, res]));
            return router(req, res, next);
        };
        return descriptor;
    }
}