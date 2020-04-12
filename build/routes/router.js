"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var create_1 = __importDefault(require("../services/create"));
var read_1 = __importDefault(require("../services/read"));
var update_1 = __importDefault(require("../services/update"));
var delete_1 = __importDefault(require("../services/delete"));
var Routes = /** @class */ (function () {
    function Routes() {
    }
    Routes.prototype.routes = function (app) {
        app.post('/createAccount', create_1.default.account);
        // app.use(checkJwt);
        app.route('/readAccount')
            .get(read_1.default.account)
            .post(read_1.default.account);
        app.route('/updateAccount')
            .post(update_1.default.account)
            .get(update_1.default.verify);
        app.delete('/deleteAccount', delete_1.default.account);
    };
    return Routes;
}());
exports.Routes = Routes;
