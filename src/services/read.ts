import * as Constants from '../utils/constants';
import WebUtil from '../utils/webUtil'
import JWT from '../utils/jwtUtil';
import Auth from '../utils/auth'
import UserDB, { User } from '../model/user';
import { Request, Response } from 'express';

class Read {

    private validateReq(req: Request): boolean {
        if (req.body && req.body.email && req.body.password) {
            return true;
        } else if (req.headers && req.headers.authorization) {
            return true;
        } else {
            return false;
        }

    }

    private compare(data: any, res: Response, flag: boolean): void {
        const email: string = data.email;
        UserDB.findOne({ email }, (findErr: any, findResult: User) => {
            if (findErr) {
                WebUtil.errorResponse(res, null, Constants.CLIENT_ERROR_A_NA, 404);
                return;
            } else if(findResult) {
                if (data.password && flag) {
                    Auth.compare(data.password, findResult.password, (compErr: any, match: boolean | null) => {
                        if (compErr) {
                            WebUtil.errorResponse(res, compErr, Constants.CLIENT_ERROR_UA, 401);
                        } else if (match) {
                            WebUtil.successResponse(res, WebUtil.stripPII(findResult), 200);
                        }
                    });
                } else {
                    WebUtil.successResponse(res, WebUtil.stripPII(findResult), 200);
                }
            } else {
                WebUtil.errorResponse(res, null, Constants.CLIENT_ERROR_A_NA, 404);
                return;
            }
        }).catch((err: any) => {
            WebUtil.errorResponse(res, null, Constants.CLIENT_ERROR_A_NA, 500);
            return;
        });
    }

    private read(req: Request, res: Response): void {
        const body = req.body;
        if (body && Object.keys(body).length !== 0) {
            this.compare(body, res, true);
        } else {
            const legit = JWT.verify(req.headers.authorization as string);
            if (legit) {
                const email: string = legit.email;
                this.compare({ email }, res, false);
            } else {
                WebUtil.errorResponse(res, Constants.CLIENT_ERROR_UA_T, Constants.CLIENT_ERROR_UA, 401);
            }
        }
    }

    public account = (req: Request, res: Response): void => {
        try {
            console.log(Constants.READ_REQ_LOG);
            const spotbackCorrelationId: string | string[] | undefined = req.headers["spotback-correlation-id"];
            if (!this.validateReq(req) || !spotbackCorrelationId) throw new Error(Constants.CLIENT_ERROR_HB);
            this.read(req, res);
        } catch (error) {
            WebUtil.errorResponse(res, error, Constants.CLIENT_ERROR_HB, 400);
            return;
        }
    }
}

export default new Read();
