import type { Request, Response } from "express";
import router from "@nina/decorators/router";
import { database } from "@nina/database/database";

export default class Token {
    @router('post', '/')
    static async create(req: Request, res: Response) {
        try {
            const { limit = 10, isVip = false } = req.body;
            const data = await database.create(limit, isVip);
            return res.status(200).json(data);
        } catch (e) {
            return res.status(500).json({
                error: {
                    code: 500,
                    message: 'internal.server.error'
                }
            })
        }
    }
}