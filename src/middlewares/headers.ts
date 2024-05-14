import type { NextFunction, Request, Response } from "express";

export default(_: Request, res: Response, next: NextFunction) => {
    res.setHeader( 'X-Powered-By', 'Nina' );
    next();
}