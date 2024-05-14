import type { NextFunction, Request, Response } from "express";

export default (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['x-nina-admin-token'];

    if (!token || token !== Bun.env.ADMIN_TOKEN) {
        res.status(401).json({
            error: {
                code: 401,
                message: 'unauthorized'
            }
        })
    }

    next();
}