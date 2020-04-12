import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export class CarObject {
    public carType!: string;
    public color!: string;
    public make!: string;
    public model!: string;
    public year!: string;
}

export class Car implements mongoose.SchemaTypeOpts<CarObject> {
    public type!: CarObject;
}

export interface User extends mongoose.Document {
    balance: number;
    car: CarObject;
    created_time: number;
    email: string;
    firstName: string;
    freeSpots: number;
    lastName: string;
    password: string;
    phone: string;
    profilePic: string;
    pushToken: string;
    referrals?: (null)[] | null;
    verified: boolean;
    referralCode?: string;
}

export const UserSchema = new Schema({
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
        type: Array<string>(),
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

const UserDB = mongoose.model<User>("Users", UserSchema);
export default UserDB;