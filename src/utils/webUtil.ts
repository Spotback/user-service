import { Response } from 'express';
import { User } from '../model/user';

class WebUtil {

    public errorResponse(res: Response, err: any, code: string, status: number): void {
        console.log(err);
        res.status(status).json({
            code: code,
            message: err
        });
    }

    public successResponse(res: Response, data: any, status: number, headers?: any): void {
        res.status(status).header(headers).json(data);
    }

    public htmlResponse(res: Response, file: string, status: number): void {
        res.status(status).sendFile(file)
    }

    public stripPII(data: any): User {
        const user = Object.assign({password: undefined}, data._doc);
        return user;
    }
}

export default new WebUtil();