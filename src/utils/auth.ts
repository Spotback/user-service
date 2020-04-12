import * as bcrypt from 'bcryptjs';

export default class Auth {
    private static readonly saltRounds: number = 10;

    public static hashPassword(password: string, callback: (error: Error, hash: string) => void): void {
        bcrypt.hash(password, this.saltRounds, (error, hash) => {
            callback(error, hash);
        });
    }

    public static compare(password: string, hashPass: string, callback: (error: string | null, match: boolean | null) => void): void {
        bcrypt.compare(password, hashPass, (err: Error, match: boolean) => {
            if(match) {
                // passwords match
                callback(null, true);
            } else {
                // passwords do not match
                callback('Invalid password match', null);
            }
        });
    }
}