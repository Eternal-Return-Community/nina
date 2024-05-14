import type { Application } from "express";
import express from "express";
import headers from '@nina/middlewares/headers';
import rateLimit from '@nina/middlewares/rateLimit';
import router from '@nina/router/router';

class App {

    public _app: Application;

    constructor() {
        this._app = express();
        this.middlewares().routes();
    }

    private middlewares(): this {
        this._app.use(express.json());
        this._app.use(express.urlencoded({ extended: false }))
        this._app.use(headers);
        this._app.use(rateLimit());
        return this;
    }

    private routes(): this {
        this._app.use('/', router);
        return this;
    }
}

export default new App()._app;