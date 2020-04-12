
export const SERVER_ERROR = 'BACKEND SERVER ERROR.';
export const LOGIN_REQ_LOG = 'LOGIN REQUEST.';
export const CREATE_REQ_LOG = 'CREATE REQUEST.';
export const UPDATE_REQ_LOG = 'UPDATE REQUEST.';
export const VERIFY_REQ_LOG = 'VERIFY REQUEST.';
export const DELETE_REQ_LOG = 'DELETE REQUEST.';
export const SERVER_ERROR_TO = 'SERVICE TIMEOUT';
export const VERIFIED_HTML = '../resources/verified.html';
export const CLIENT_ERROR_UA = 'UNAUTHORIZED.';
export const CLIENT_ERROR_A_NA = 'ACCOUNT NOT FOUND.';
export const CLIENT_ERROR_UA_T = 'TOKEN UNAUTHORIZED.';
export const SUCCESS = 'SUCCESS.';
export const CLIENT_ERROR_HB = 'BAD REQUEST.';
export const CLIENT_ERROR_AE = 'ACCOUNT ALREADY EXISTS.';
export const CHARGE_ENDPOINT = '/financials/payments/charge';
export const CHARGE_ENDPOINT_DEV = '/financials.dev/payments/charge';
export const WITHDRAW_ENDPOINT = '/financials/payments/withdraw';
export const WITHDRAW_ENDPOINT_DEV = '/financials.dev/payments/withdraw';
export const TRANSACTIONS_ENDPOINT = '/financials/payments/transactions';
export const TRANSACTIONS_ENDPOINT_DEV = '/financials.dev/payments/transactions';
export const PRICE_KEY = 'feeName';
export const PRICE_TABLE = 'Pricing';
export const USERS_TABLE = 'Users';
export const USERS_KEY = 'email';
export const CONF_TABLE = 'confirmations';  
export const DEFAULT_ERROR = {
    statusCode: 502,
    body :{
        code: 'BAD GATEWAY.',
        message: 'DEFAULT ERROR RESPONSE.'
    }
}  

