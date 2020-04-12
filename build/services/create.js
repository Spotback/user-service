"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Constants = __importStar(require("../utils/constants"));
var webUtil_1 = __importDefault(require("../utils/webUtil"));
var jwtUtil_1 = __importDefault(require("../utils/jwtUtil"));
var emailUtil_1 = __importDefault(require("../utils/emailUtil"));
var v1_1 = __importDefault(require("uuid/v1"));
var auth_1 = __importDefault(require("../utils/auth"));
var user_1 = __importDefault(require("../model/user"));
var Create = /** @class */ (function () {
    function Create() {
        var _this = this;
        this.account = function (req, res) {
            try {
                var referralCode_1 = req.body.referralCode;
                delete req.body['referralCode'];
                console.log(Constants.CREATE_REQ_LOG);
                var body_1 = req.body ? req.body : {};
                var spotbackCorrelationId = req.headers["spotback-correlation-id"];
                if (!_this.validateNewAccnt(body_1) || !spotbackCorrelationId)
                    throw new Error(Constants.CLIENT_ERROR_HB);
                user_1.default.findOne(body_1, function (findErr, findRes) {
                    if (findErr) {
                        webUtil_1.default.errorResponse(res, findErr, Constants.SERVER_ERROR, 500);
                        return;
                    }
                    else if (findRes) {
                        webUtil_1.default.errorResponse(res, 'An account with that email already exists.', Constants.CLIENT_ERROR_AE, 409);
                        return;
                    }
                    else {
                        /** TODO
                         * need to set email data.
                         */
                        emailUtil_1.default.send('', '', body_1, function (emailErr, emailResult) {
                            if (emailErr) {
                                webUtil_1.default.errorResponse(res, emailErr, Constants.SERVER_ERROR, 500);
                            }
                            else {
                                _this.create(body_1, res, referralCode_1);
                            }
                        });
                    }
                });
            }
            catch (error) {
                webUtil_1.default.errorResponse(res, error, Constants.CLIENT_ERROR_HB, 400);
                return;
            }
        };
    }
    Create.prototype.validateNewAccnt = function (newAccnt) {
        if (Object.keys(newAccnt).length < 5)
            return false;
        if ('freeSpots' in newAccnt || 'balance' in newAccnt
            || 'referrals' in newAccnt)
            return false;
        return true;
    };
    Create.prototype.create = function (newUser, res, referralCode) {
        var password = newUser.password;
        auth_1.default.hashPassword(password, function (err, hash) {
            if (err) {
                // throw and error
                webUtil_1.default.errorResponse(res, err, Constants.SERVER_ERROR, 500);
            }
            else {
                newUser.password = hash;
                newUser.referralCode = v1_1.default();
                newUser.created_time = Date.now();
                if (referralCode) {
                    user_1.default.findOneAndUpdate({ referralCode: referralCode }, {
                        $push: {
                            referrals: newUser.email
                        },
                        $inc: {
                            freeSpots: 1
                        }
                    }, function (updateErr, doc, updateRes) {
                        if (updateErr) {
                            console.log(updateErr);
                        }
                    });
                }
                user_1.default.create(newUser).then(function (createResult) {
                    var token = jwtUtil_1.default.sign(Object.assign({}, createResult));
                    delete createResult['password'];
                    webUtil_1.default.successResponse(res, createResult, 200, { bearer: token });
                    return;
                }, function (createErr) {
                    webUtil_1.default.errorResponse(res, createErr, Constants.SERVER_ERROR, 500);
                    return;
                });
            }
        });
    };
    return Create;
}());
exports.default = new Create();
