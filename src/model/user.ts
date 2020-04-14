import * as mongoose from 'mongoose';
import * as Constants from '../utils/constants';

const Schema = mongoose.Schema;

/**
 * Converts an object to a dotified object.
 *
 * @param obj         Object
 * @returns           Dotified Object
 */
export const dotify = (obj: any) => {

    const res: any = {};
  
    function recurse(obj: any, current?: string) {
      for (const key in obj) {
        const value = obj[key];
        const newKey = (current ? current + '.' + key : key);
        if (value && typeof value === 'object') {
          recurse(value, newKey);
        } else {
          res[newKey] = value;
        }
      }
    }
  
    recurse(obj);
    return res;
  }

export class CarObject {
    public carType!: string;
    public color!: string;
    public make!: string;
    public model!: string;
    public year!: string;
}

const carSchema = new Schema({
    make: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    carType: {
        type: String,
        required: true
    }
})

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
    stripeToken: string;
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
    created_time: {
        type: Date,
        required: true
    },
    freeSpots: {
        type: Number,
        default: 0
    },
    balance: {
        type: Number,
        default: 0.00
    },
    car: {
        type: carSchema,
        default: null
    },
});

const UserDB = mongoose.model<User>(Constants.USERS_TABLE, UserSchema);
export default UserDB;