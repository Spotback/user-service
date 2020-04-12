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
var app_1 = __importDefault(require("./app"));
var https = __importStar(require("https"));
var fs = __importStar(require("fs"));
var PORT = 3000;
var httpsOptions = {
    key: fs.readFileSync('./build/config/key.pem'),
    cert: fs.readFileSync('./build/config/cert.pem')
};
https.createServer(httpsOptions, app_1.default).listen(PORT, function () {
    console.log('Express server listening on port ' + PORT);
});
