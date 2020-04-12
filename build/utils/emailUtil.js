"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var nodemailer_1 = __importDefault(require("nodemailer"));
var substitutor_1 = __importDefault(require("./substitutor"));
var EmailUtil = /** @class */ (function () {
    function EmailUtil() {
        this.from = 'spotbackteam@gmail.com';
        process.env.GMAIL_USERNAME = 'spotbackteam@gmail.com';
        process.env.GMAIL_PASSWORD = 'Sp0ticusp@rk19';
        var username = process.env.GMAIL_USERNAME;
        var password = process.env.GMAIL_PASSWORD;
        this.transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: {
                type: 'login',
                user: username,
                pass: password
            }
        });
    }
    EmailUtil.prototype.send = function (message, subject, data, callback) {
        //map the data into the message
        var mappedMessage = substitutor_1.default(message, data);
        //set the text to the message
        var mailOptions = {
            html: mappedMessage,
            to: data.email,
            subject: subject
        };
        this.transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.error(error);
                callback(error, null);
            }
            else {
                console.debug('Email sent: ' + info.response);
                callback(null, info);
            }
        });
    };
    return EmailUtil;
}());
exports.default = new EmailUtil();
