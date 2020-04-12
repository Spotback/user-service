"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_jwt_1 = __importDefault(require("express-jwt"));
var jwks_rsa_1 = __importDefault(require("jwks-rsa"));
var dotenv = __importStar(require("dotenv"));
dotenv.config();
exports.checkJwt = express_jwt_1.default({
    secret: jwks_rsa_1.default.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: process.env.AUTH0_ISSUER + ".well-known/jwks.json"
    }),
    // Validate the audience and the issuer.
    audience: process.env.AUTH0_AUDIENCE,
    issuer: "" + process.env.AUTH0_ISSUER,
    algorithms: ['RS256']
});
