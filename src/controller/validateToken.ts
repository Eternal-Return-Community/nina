import { database } from "@nina/database/database";
import type { Request, Response } from "express";

export default (limit: number) => {
    return async function (req: Request, res: Response) {
        try {
            const token = req.headers['x-nina-token'] as string || '';
            const validate = await database.read(token);

            if (!token) {
                res.status(401).json({
                    error: {
                        code: 401,
                        message: 'unauthorized'
                    }
                })
            }

            if (validate.isVip) return validate.limit;

            return limit
        } catch (e) {
            res.status(401).json({
                error: {
                    code: 401,
                    message: 'unauthorized'
                }
            })
            return limit
        }
    }
}