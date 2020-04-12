"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var fs_1 = __importDefault(require("fs"));
var JWTUtil = /** @class */ (function () {
    function JWTUtil() {
        this.algorithm = process.env.ALGORITHM;
        this.publicKey = fs_1.default.readFileSync('./config/key.pem');
        this.privateKey = fs_1.default.readFileSync('./config/key.pem');
        this.i = 'spotbackapp.com'; // Issuer 
        this.a = 'https://www.spotbackapp.com'; // Audience
    }
    JWTUtil.prototype.verify = function (token) {
        console.debug("ATTEMPTING TO VERIFY");
        if (!token) {
            return token;
        }
        console.log(process.cwd());
        var verifyOptions = {
            issuer: this.i,
            audience: this.a,
            algorithms: ['RS256']
        };
        var legit = jsonwebtoken_1.default.verify(token, this.publicKey, verifyOptions);
        if (!legit) {
            console.debug('VERIFICATION FAILED');
            return legit;
        }
        else {
            console.debug('VERIFICATION SUCCEEDED');
            return legit;
        }
    };
    JWTUtil.prototype.sign = function (payload) {
        var signOptions = {
            issuer: this.i,
            audience: this.a,
            expiresIn: "730h",
            algorithm: 'RS256'
        };
        var token = jsonwebtoken_1.default.sign(payload, this.privateKey, signOptions);
        return token;
    };
    return JWTUtil;
}());
exports.default = new JWTUtil();
