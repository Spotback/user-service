"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = __importStar(require("mongoose"));
var Schema = mongoose.Schema;
var CarObject = /** @class */ (function () {
    function CarObject() {
    }
    return CarObject;
}());
exports.CarObject = CarObject;
var Car = /** @class */ (function () {
    function Car() {
    }
    return Car;
}());
exports.Car = Car;
exports.UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        index: true,
        unique: true,
        required: true
    },
    phone: {
        type: String,
        index: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profilePic: {
        type: String
    },
    pushToken: {
        type: String
    },
    stripeToken: {
        type: String
    },
    freeSpots: {
        type: Number,
        default: 0
    },
    balance: {
        type: Number,
        default: 0.00
    },
    referrals: {
        type: Array(),
        default: []
    },
    referralCode: {
        type: String,
        index: true,
        unique: true
    },
    verified: {
        type: Boolean,
        default: false
    },
    car: {
        type: Object,
        default: null
    },
    created_time: {
        type: Date,
        required: true
    }
});
var UserDB = mongoose.model("Users", exports.UserSchema);
exports.default = UserDB;
