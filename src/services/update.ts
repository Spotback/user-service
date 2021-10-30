import * as Constants from '../utils/constants';
import WebUtil from '../utils/webUtil'
import JWT from '../utils/jwtUtil';
import UserDB, { User } from '../model/user';
import { request, Request, Response } from 'express';
import { dotify } from '../model/user';
import { UserInfo } from 'os';

class Update {

    private validateVerify(req: Request): boolean {
        if (req.query.email) return true;
        else return false;
    }

    private validateUpdate(req: Request): boolean {
        const body: User = req.body as User;
        if (!req.headers.bearer || body.email || body.balance || body.verified
            || body.freeSpots || body.referrals || body.referralCode || body.created_time || body.password) {
            return false;
        } else return true;
    }

    /**
     * 
     * @param data fields to update
     * @param email id to lookup
     * @param res Response object
     * @param flag respond with updated data
     */
    private update(data: User, email: string, res: Response, flag: boolean): void {
        UserDB.findOneAndUpdate({ email }, dotify(data), {}, (updateErr: any, doc: User | null, updateRes: any) => {
            if (updateErr) {
                WebUtil.errorResponse(res, updateErr, Constants.SERVER_ERROR, 500);
            } else if (doc) {
                if (flag) {
                    WebUtil.htmlResponse(res, Constants.VERIFIED_HTML_LOCATION, 200);
                } else {
                    /**
                     * add the new fields to the object
                     */
                    this.read(doc, res);
                    return;
                }
            } else {
                WebUtil.errorResponse(res, updateErr, Constants.CLIENT_ERROR_A_NA, 404);
            }
        });
    }

    private read(data: User, res: Response): void {
        const email: string = data.email;
        UserDB.findOne({ email }, (findErr: any, findResult: User) => {
            if (findErr) {
                WebUtil.errorResponse(res, findErr, Constants.SERVER_ERROR, 500);
                return;
            } else if (findResult) {
                const token: string = JWT.sign(Object.assign({}, findResult))
                WebUtil.successResponse(res, WebUtil.stripPII(findResult), 200, { bearer: token });
            } else {
                WebUtil.errorResponse(res, null, Constants.CLIENT_ERROR_A_NA, 204);
                return;
            }
        }).catch((err: any) => {
            WebUtil.errorResponse(res, err, Constants.SERVER_ERROR, 500);
            return;
        });
    }

    public verify = (req: Request, res: Response): void => {
        try {
            console.log(Constants.VERIFY_REQ_LOG);
            if (!this.validateVerify(req)) throw new Error(Constants.CLIENT_ERROR_HB);
            const verified = true;
            this.update({ verified } as User, req.query.email as string, res, true);
        } catch (error) {
            WebUtil.errorResponse(res, error, Constants.CLIENT_ERROR_HB, 400);
            return;
        }
    }

    public account = (req: Request, res: Response): void => {
        try {
            console.log(Constants.UPDATE_REQ_LOG);
            const spotbackCorrelationId: string | string[] | undefined = req.headers["spotback-correlation-id"];
            if (!this.validateUpdate(req) || !spotbackCorrelationId) throw new Error(Constants.CLIENT_ERROR_HB);
            const legit = JWT.verify(req.headers.bearer as string);
            if (legit) {
                const email: string = legit.email;
                this.update(req.body, email, res, false);
            } else {
                WebUtil.errorResponse(res, Constants.CLIENT_ERROR_UA_T, Constants.CLIENT_ERROR_UA, 401);
            }
        } catch (error) {
            WebUtil.errorResponse(res, error, Constants.CLIENT_ERROR_HB, 400);
            return;
        }
    }
}

export default new Update();
