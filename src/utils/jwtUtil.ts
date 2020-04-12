import jwt, { SignOptions, VerifyOptions, Algorithm } from 'jsonwebtoken';
import fs from 'fs';
import * as Constants from '../utils/constants';

class JWTUtil {
    
    private readonly algorithm: string;
    private readonly publicKey: any;
    private readonly privateKey: any;
    private readonly i: string;
    private readonly a: string;
    constructor() {
        this.algorithm = process.env.ALGORITHM as string;
        this.publicKey = fs.readFileSync(Constants.CERT_LOCATION);
        this.privateKey = fs.readFileSync(Constants.KEY_LOCATION);
        this.i  = Constants.ISSUER;          // Issuer 
        this.a  = Constants.AUDIENCE; // Audience
    }

    public verify(token: string): any {
        console.debug(Constants.JWT_VERIFY_LOG);
        if(!token) {
            return token;
        }
        console.log(process.cwd());
        const verifyOptions: VerifyOptions = {
            issuer:  this.i,
            audience:  this.a,
            algorithms:  [this.algorithm as Algorithm]
        };
        const legit = jwt.verify(token, this.publicKey, verifyOptions);
        if(!legit) {
            console.debug(Constants.JWT_FAILURE_LOG);
            return legit;
        } else {
            console.debug(Constants.JWT_SUCCESS_LOG);
            return legit;
        }
    }
    
    public sign(payload: any): string {
        const signOptions: SignOptions = {
            issuer:  this.i,
            audience:  this.a,
            expiresIn:  process.env.JWT_EXPIRATION,
            algorithm:  this.algorithm as Algorithm
        };
        const token: string = jwt.sign(payload, this.privateKey, signOptions);
        return token;
    }
}

export default new JWTUtil();
