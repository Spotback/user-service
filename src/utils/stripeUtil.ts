import * as Constants from '../utils/constants';
const stripe = require('stripe')(process.env.STRIPE_KEY);

export const chargeClient = (client: any, amount: any): void => {
    console.log('here is the client:');
    console.log(client);
    if(!client) return;
    console.log('debug', 'ATTEMPTING TO CHARGE CLIENT');
    const charge = stripe.paymentIntents.create({
            amount: amount,
            currency: 'usd',
            description: 'Example charge',
            source: "pm_1FjI4gIELhTkPYaGiccMi696"
    });
    }
    
export const withdraw = (client: any, amount: any): void => {
    if(!client || client.balance < 15 || !client.balance) return;
    console.log('debug', 'ATTEMPTING PAYOUT');

}

export const create = (newUser: any, callback: Function) => {
    stripe.customers.create({
    email: newUser.email,
    name: newUser.firstName + ' ' + newUser.lastName,
    phone: newUser.phone
   }, (err: any, customer: any) => {
       if(err) {
           console.log(err);
           callback(Constants.STRIPE_ERROR, null);
           return;
       } else {
           callback(null, customer === null ? null : customer.id);
       }
     });
    }