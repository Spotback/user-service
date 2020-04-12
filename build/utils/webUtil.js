"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WebUtil = /** @class */ (function () {
    function WebUtil() {
    }
    WebUtil.prototype.errorResponse = function (res, err, code, status) {
        console.log(err);
        res.status(status).json({
            code: code,
            message: err
        });
    };
    WebUtil.prototype.successResponse = function (res, data, status, headers) {
        res.status(status).header(headers).json(data);
    };
    WebUtil.prototype.htmlResponse = function (res, file, status) {
        res.status(status).sendFile(file);
    };
    return WebUtil;
}());
exports.default = new WebUtil();
