import * as Constants from '../utils/constants';
import Stripe from 'stripe';
import {User} from "../model/user";
const stripe = new Stripe(process.env.STRIPE_KEY as any, {
    apiVersion: '2020-08-27',
});

export const chargeClient = (client: any, amount: any): void => {
    console.log('here is the client:');
    console.log(client);
    if (!client) return;
    console.log('debug', 'ATTEMPTING TO CHARGE CLIENT');
    const charge = stripe.paymentIntents.create({
        amount: amount,
        currency: 'usd',
        description: 'Example charge',
        source: "pm_1FjI4gIELhTkPYaGiccMi696"
    } as any);
}

export const withdraw = (client: any, amount: any): void => {
    if (!client || client.balance < 15 || !client.balance) return;
    console.log('debug', 'ATTEMPTING PAYOUT');

}

export const createCustomer = async (newUser: User): Promise<any> => {
    const params: Stripe.CustomerCreateParams = {
        email: newUser.email,
        name: newUser.firstName + ' ' + newUser.lastName,
        phone: newUser.phone
    };

    const customer: Stripe.Customer = await stripe.customers.create(params);
    if(customer.id) {
        return customer.id;
    } else {
        console.log(Constants.STRIPE_CREATE_CUSTOMER_ERROR);
        return null;
    }
}
