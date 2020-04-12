"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SERVER_ERROR = 'BACKEND SERVER ERROR.';
exports.LOGIN_REQ_LOG = 'LOGIN REQUEST.';
exports.CREATE_REQ_LOG = 'CREATE REQUEST.';
exports.UPDATE_REQ_LOG = 'UPDATE REQUEST.';
exports.VERIFY_REQ_LOG = 'VERIFY REQUEST.';
exports.DELETE_REQ_LOG = 'DELETE REQUEST.';
exports.SERVER_ERROR_TO = 'SERVICE TIMEOUT';
exports.VERIFIED_HTML = '../resources/verified.html';
exports.CLIENT_ERROR_UA = 'UNAUTHORIZED.';
exports.CLIENT_ERROR_A_NA = 'ACCOUNT NOT FOUND.';
exports.CLIENT_ERROR_UA_T = 'TOKEN UNAUTHORIZED.';
exports.SUCCESS = 'SUCCESS.';
exports.CLIENT_ERROR_HB = 'BAD REQUEST.';
exports.CLIENT_ERROR_AE = 'ACCOUNT ALREADY EXISTS.';
exports.CHARGE_ENDPOINT = '/financials/payments/charge';
exports.CHARGE_ENDPOINT_DEV = '/financials.dev/payments/charge';
exports.WITHDRAW_ENDPOINT = '/financials/payments/withdraw';
exports.WITHDRAW_ENDPOINT_DEV = '/financials.dev/payments/withdraw';
exports.TRANSACTIONS_ENDPOINT = '/financials/payments/transactions';
exports.TRANSACTIONS_ENDPOINT_DEV = '/financials.dev/payments/transactions';
exports.PRICE_KEY = 'feeName';
exports.PRICE_TABLE = 'Pricing';
exports.USERS_TABLE = 'Users';
exports.USERS_KEY = 'email';
exports.CONF_TABLE = 'confirmations';
exports.DEFAULT_ERROR = {
    statusCode: 502,
    body: {
        code: 'BAD GATEWAY.',
        message: 'DEFAULT ERROR RESPONSE.'
    }
};
