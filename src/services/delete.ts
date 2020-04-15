import * as Constants from '../utils/constants';
import WebUtil from '../utils/webUtil'
import JWT from '../utils/jwtUtil';
import UserDB, { User } from '../model/user';
import { Request, Response } from 'express';

class Delete {

    private delete(data: any, res: Response): void {
        const email: string = data.email;
        UserDB.findOneAndDelete({ email }, (findErr: any, findResult: User | null) => {
            if (findErr) {
                WebUtil.errorResponse(res, null, Constants.CLIENT_ERROR_A_NA, 404);
                return;
            } else {
                const message = {
                    code: Constants.SUCCESS,
                    message: Constants.ACCOUNT_DELETED_MESSAGE
                }
                WebUtil.successResponse(res, message, 202);

            }
        });
    }

    private validate(req: Request, res: Response): void {
        const legit = JWT.verify(req.headers.bearer as string);
        if (legit) {
            const email: string = legit.email;
            this.delete({ email }, res);
        } else {
            WebUtil.errorResponse(res, Constants.CLIENT_ERROR_UA_T, Constants.CLIENT_ERROR_UA, 401);
        }

    }

    public account = (req: Request, res: Response): void => {
        try {
            console.log(Constants.DELETE_REQ_LOG);
            const spotbackCorrelationId: string | string[] | undefined = req.headers['spotback-correlation-id'];
            if (!req.headers.bearer || !spotbackCorrelationId) throw new Error(Constants.CLIENT_ERROR_HB);
            this.validate(req, res);
        } catch (error) {
            WebUtil.errorResponse(res, error, Constants.CLIENT_ERROR_HB, 400);
            return;
        }
    }
}

export default new Delete();
