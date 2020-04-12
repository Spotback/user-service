"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt = __importStar(require("bcryptjs"));
var Auth = /** @class */ (function () {
    function Auth() {
    }
    Auth.hashPassword = function (password, callback) {
        bcrypt.hash(password, this.saltRounds, function (error, hash) {
            callback(error, hash);
        });
    };
    Auth.compare = function (password, hashPass, callback) {
        bcrypt.compare(password, hashPass, function (err, match) {
            if (match) {
                // passwords match
                callback(null, true);
            }
            else {
                // passwords do not match
                callback('Invalid password match', null);
            }
        });
    };
    Auth.saltRounds = 10;
    return Auth;
}());
exports.default = Auth;
