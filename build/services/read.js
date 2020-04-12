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
var auth_1 = __importDefault(require("../utils/auth"));
var user_1 = __importDefault(require("../model/user"));
var Read = /** @class */ (function () {
    function Read() {
        var _this = this;
        this.account = function (req, res) {
            try {
                console.log(Constants.LOGIN_REQ_LOG);
                var spotbackCorrelationId = req.headers["spotback-correlation-id"];
                if (!_this.validateReq(req) || !spotbackCorrelationId)
                    throw new Error(Constants.CLIENT_ERROR_HB);
                _this.compare(req, res);
            }
            catch (error) {
                webUtil_1.default.errorResponse(res, error, Constants.CLIENT_ERROR_HB, 400);
                return;
            }
        };
    }
    Read.prototype.validateReq = function (req) {
        if (req.body && req.body.email && req.body.password) {
            return true;
        }
        else if (req.headers && req.headers.bearer) {
            return true;
        }
        else {
            return false;
        }
    };
    Read.prototype.read = function (data, res, flag) {
        var email = data.email;
        user_1.default.findOne({ email: email }, function (findErr, findResult) {
            if (findErr) {
                webUtil_1.default.errorResponse(res, null, Constants.CLIENT_ERROR_A_NA, 404);
                return;
            }
            else if (findResult) {
                if (data.password && flag) {
                    auth_1.default.compare(data.password, findResult.password, function (compErr, match) {
                        if (compErr) {
                            webUtil_1.default.errorResponse(res, compErr, Constants.CLIENT_ERROR_UA, 401);
                        }
                        else if (match) {
                            var token = jwtUtil_1.default.sign(Object.assign({}, findResult));
                            webUtil_1.default.successResponse(res, webUtil_1.default.stripPII(findResult), 200, { bearer: token });
                        }
                    });
                }
                else {
                    var token = jwtUtil_1.default.sign(Object.assign({}, findResult));
                    webUtil_1.default.successResponse(res, webUtil_1.default.stripPII(findResult), 200, { bearer: token });
                }
            }
            else {
                webUtil_1.default.errorResponse(res, null, Constants.CLIENT_ERROR_A_NA, 404);
                return;
            }
        }).catch(function (err) {
            webUtil_1.default.errorResponse(res, null, Constants.CLIENT_ERROR_A_NA, 500);
            return;
        });
    };
    Read.prototype.compare = function (req, res) {
        var body = req.body;
        if (body && Object.keys(body).length !== 0) {
            this.read(body, res, true);
        }
        else {
            var legit = jwtUtil_1.default.verify(req.headers.bearer);
            if (legit) {
                var email = legit._doc.email;
                this.read({ email: email }, res, false);
            }
            else {
                webUtil_1.default.errorResponse(res, Constants.CLIENT_ERROR_UA_T, Constants.CLIENT_ERROR_UA, 401);
            }
        }
    };
    return Read;
}());
exports.default = new Read();
