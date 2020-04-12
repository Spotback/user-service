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
var user_1 = __importDefault(require("../model/user"));
var Update = /** @class */ (function () {
    function Update() {
        var _this = this;
        this.verify = function (req, res) {
            try {
                console.log(Constants.VERIFY_REQ_LOG);
                if (!_this.validateVerify(req))
                    throw new Error(Constants.CLIENT_ERROR_HB);
                var verified = true;
                _this.update({ verified: verified }, req.query.email, res, true);
            }
            catch (error) {
                webUtil_1.default.errorResponse(res, error, Constants.CLIENT_ERROR_HB, 400);
                return;
            }
        };
        this.account = function (req, res) {
            try {
                var spotbackCorrelationId = req.headers["spotback-correlation-id"];
                if (!_this.validateUpdate(req) || !spotbackCorrelationId)
                    throw new Error(Constants.CLIENT_ERROR_HB);
                var legit = jwtUtil_1.default.verify(req.headers.bearer);
                if (legit) {
                    var email = legit._doc.email;
                    _this.update(req.body, email, res, false);
                }
                else {
                    webUtil_1.default.errorResponse(res, Constants.CLIENT_ERROR_UA_T, Constants.CLIENT_ERROR_UA, 401);
                }
            }
            catch (error) {
                webUtil_1.default.errorResponse(res, error, Constants.CLIENT_ERROR_HB, 400);
                return;
            }
        };
    }
    Update.prototype.validateVerify = function (req) {
        if (req.params.email)
            return true;
        else
            return false;
    };
    Update.prototype.validateUpdate = function (req) {
        var body = req.body;
        if (!req.headers.bearer && body.email && body.balance && body.verified
            && body.freeSpots && body.referrals && body.referralCode && body.created_time) {
            return false;
        }
        else
            return true;
    };
    /**
     *
     * @param data fields to update
     * @param email id to lookup
     * @param res Response object
     * @param flag respond with updated data
     */
    Update.prototype.update = function (data, email, res, flag) {
        user_1.default.findOneAndUpdate({ email: email }, data, function (updateErr, doc, updateRes) {
            if (updateErr) {
                webUtil_1.default.errorResponse(res, updateErr, Constants.SERVER_ERROR, 500);
            }
            else if (doc) {
                if (flag) {
                    webUtil_1.default.htmlResponse(res, Constants.VERIFIED_HTML, 200);
                }
                else {
                    var token = jwtUtil_1.default.sign(Object.assign({}, doc));
                    delete doc['password'];
                    webUtil_1.default.successResponse(res, doc, 200, { bearer: token });
                }
            }
        });
    };
    return Update;
}());
exports.default = new Update();
