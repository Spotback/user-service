import jwt, { SignOptions, VerifyOptions, Algorithm } from 'jsonwebtoken';
import fs from 'fs';
import * as Constants from '../utils/constants';

class JWTUtil {
    
    private readonly algorithm: string;
    private readonly publicKey: any;
    private readonly privateKey: any;
    private readonly i: any;
    private readonly a: any;
    constructor() {
        this.algorithm = process.env.ALGORITHM as string;
        this.publicKey = fs.readFileSync(Constants.CERT_LOCATION);
        this.privateKey = fs.readFileSync(Constants.KEY_LOCATION);
        this.i  = process.env.AUTH0_ISSUER;          // Issuer 
        this.a  = process.env.AUTH0_AUDIENCE; // Audience
    }

    public verify(authorization: string): any {
        console.debug(Constants.JWT_VERIFY_LOG);
        if(!authorization) {
            return false;
        }
        const token: string = authorization.split('.')[1];
        const payloadBase64 = Buffer.from(token, 'base64').toString();
        const payload = JSON.parse(payloadBase64);
        const legit = payload.sub.split('|')[1];
        console.log(legit);
        if(!legit) {
            console.debug(Constants.JWT_FAILURE_LOG);
            return legit;
        } else {
            console.debug(Constants.JWT_SUCCESS_LOG);
            return {email: legit};
        }
    }
}
export default new JWTUtil();
