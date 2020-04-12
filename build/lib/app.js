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
var express_1 = __importDefault(require("express"));
var bodyParser = __importStar(require("body-parser"));
var router_1 = require("../routes/router");
var mongoose = require("mongoose");
var App = /** @class */ (function () {
    // public mongoUrl = `mongodb://${process.env.MONGO_HOST}:27017/Users'`;
    function App() {
        this.app = express_1.default();
        this.routePrv = new router_1.Routes();
        this.mongoUrl = 'mongodb://localhost/Users';
        this.config();
        this.mongoSetup();
        this.routePrv.routes(this.app);
    }
    App.prototype.config = function () {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        // serving static files 
        this.app.use(express_1.default.static('public'));
    };
    App.prototype.mongoSetup = function () {
        mongoose.connect(this.mongoUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
    };
    return App;
}());
exports.default = new App().app;
