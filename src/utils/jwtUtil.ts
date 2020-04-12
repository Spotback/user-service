import jwt, { SignOptions, VerifyOptions, Algorithm } from 'jsonwebtoken';
import fs from 'fs';

class JWTUtil {
    
    private readonly algorithm: string;
    private readonly publicKey: any;
    private readonly privateKey: any;
    private readonly i: string;
    private readonly a: string;
    constructor() {
        this.algorithm = process.env.ALGORITHM as string;
        this.publicKey = fs.readFileSync('./build/config/key.pem');
        this.privateKey = fs.readFileSync('./build/config/key.pem');
        this.i  = 'spotbackapp.com';          // Issuer 
        this.a  = 'https://www.spotbackapp.com'; // Audience
    }

    public verify(token: string): any {
        console.debug("ATTEMPTING TO VERIFY");
        if(!token) {
            return token;
        }
        console.log(process.cwd());
        const verifyOptions: VerifyOptions = {
            issuer:  this.i,
            audience:  this.a,
            algorithms:  ['RS256' as Algorithm]
        };
        const legit = jwt.verify(token, this.publicKey, verifyOptions);
        if(!legit) {
            console.debug('VERIFICATION FAILED');
            return legit;
        } else {
            console.debug('VERIFICATION SUCCEEDED');
            return legit;
        }
    }
    
    public sign(payload: any): string {
        const signOptions: SignOptions = {
            issuer:  this.i,
            audience:  this.a,
            expiresIn:  "730h",
            algorithm:  'RS256' as Algorithm
        };
        const token: string = jwt.sign(payload, this.privateKey, signOptions);
        return token;
    }
}

export default new JWTUtil();