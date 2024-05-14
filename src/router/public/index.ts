import type { Request, Response } from "express";
import router from "@nina/decorators/router";

export default class Index {

    @router('get', '/')
    static home(req: Request, res: Response) {
        return res.status(200).json({
            message: 'Hello, World'
        })
    }
}