export default class CustomError extends Error {

    public code: number;
    public message: string;

    constructor(code: number = 500, message: string = 'internal.server.error') {
        super()
        this.code = code;
        this.message = message;
    }
}