
import * as Constants from '../utils/constants';
import WebUtil from '../utils/webUtil'
import JWT from '../utils/jwtUtil';
import EMAIL from '../utils/emailUtil';
import uuidv1 from 'uuid/v1';
import Auth from '../utils/auth'
import UserDB, { User } from '../model/user';
import { Request, Response } from 'express';

class Create {

    private validateNewAccnt(newAccnt: User): boolean {
        if (Object.keys(newAccnt).length < 5) return false;
        if ('freeSpots' in newAccnt || 'balance' in newAccnt
            || 'referrals' in newAccnt) return false;
        return true;
    }

    private create(newUser: User, res: Response, referralCode?: string): void {
        const password: string = newUser.password;
        let freeSpots = 0;
        Auth.hashPassword(password, (err: Error, hash: string) => {
            if (err) {
                // throw and error
                WebUtil.errorResponse(res, err, Constants.SERVER_ERROR, 500);
            } else {
                newUser.password = hash;
                newUser.referralCode = uuidv1();
                newUser.created_time = Date.now();
                if (referralCode) {
                    UserDB.findOneAndUpdate({ referralCode }, {
                        $push: {
                            referrals: newUser.email as string
                        },
                        $inc: {
                            freeSpots: 1
                        }
                    }, (updateErr: any, doc: User | null, updateRes: any) => {
                        if (updateErr) {
                            console.log(updateErr);
                        } else if(doc) {
                            freeSpots = 1
                        }
                    });
                }
                UserDB.create(newUser).then((createResult: User): void => {
                    const responseBody = {
                        message: 'Account created successfully!',
                        freeSpots: freeSpots
                    }
                    const token: string = JWT.sign(Object.assign({}, createResult));
                    //need to fix this response
                    WebUtil.successResponse(res, responseBody, 200, { bearer: token });
                    return;
                }, (createErr: any): void => {
                    WebUtil.errorResponse(res, createErr, Constants.SERVER_ERROR, 500);
                    return;
                });
            }
        })
    }

    public account = (req: Request, res: Response): void => {
        try {
            const referralCode = req.body.referralCode;
            req.body.referralCode = undefined;
            console.log(Constants.CREATE_REQ_LOG);
            const body: User = req.body ? req.body as User : {} as User;
            const spotbackCorrelationId: string | string[] | undefined = req.headers["spotback-correlation-id"];
            if (!this.validateNewAccnt(body) || !spotbackCorrelationId) throw new Error(Constants.CLIENT_ERROR_HB);
            UserDB.findOne(body, (findErr: any, findRes: User | null): void => {
                if (findErr) {
                    WebUtil.errorResponse(res, findErr, Constants.SERVER_ERROR, 500);
                    return;
                } else if (findRes) {
                    WebUtil.errorResponse(res, 'An account with that email already exists.',
                        Constants.CLIENT_ERROR_AE, 409);
                    return;
                } else {
                    /** TODO
                     * need to set email data.
                     */
                    EMAIL.send('', '', body, (emailErr: any, emailResult: any): void => {
                        if (emailErr) {
                            WebUtil.errorResponse(res, emailErr, Constants.SERVER_ERROR, 500);
                        } else {
                            this.create(body, res, referralCode);
                        }
                    });
                }
            });
        } catch (error) {
            WebUtil.errorResponse(res, error, Constants.CLIENT_ERROR_HB, 400);
            return;
        }
    }
}

export default new Create();