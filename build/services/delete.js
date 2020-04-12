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
var Delete = /** @class */ (function () {
    function Delete() {
        var _this = this;
        this.account = function (req, res) {
            try {
                console.log(Constants.DELETE_REQ_LOG);
                var spotbackCorrelationId = req.headers["spotback-correlation-id"];
                if (req.headers.bearer || !spotbackCorrelationId)
                    throw new Error(Constants.CLIENT_ERROR_HB);
                _this.validate(req, res);
            }
            catch (error) {
                webUtil_1.default.errorResponse(res, error, Constants.CLIENT_ERROR_HB, 400);
                return;
            }
        };
    }
    Delete.prototype.delete = function (data, res, flag) {
        var email = data.email;
        user_1.default.findOneAndDelete({ email: email }, function (findErr, findResult) {
            if (findErr) {
                webUtil_1.default.errorResponse(res, null, Constants.CLIENT_ERROR_A_NA, 404);
                return;
            }
            else {
                var message = {
                    code: Constants.SUCCESS,
                    message: 'ACCOUNT DELETED'
                };
                webUtil_1.default.successResponse(res, message, 202);
            }
        });
    };
    Delete.prototype.validate = function (req, res) {
        var legit = jwtUtil_1.default.verify(req.headers.bearer);
        if (legit) {
            var email = legit._doc.email;
            this.delete({ email: email }, res, false);
        }
        else {
            webUtil_1.default.errorResponse(res, Constants.CLIENT_ERROR_UA_T, Constants.CLIENT_ERROR_UA, 401);
        }
    };
    return Delete;
}());
exports.default = new Delete();
