export const VERIFIED_HTML_LOCATION = '/verified.html';
export const WELCOME_HTML_LOCATION = './resources/welcome.html';
export const WELCOME_SUBJECT = 'Thank you for joining the Spotback community!';
export const STATIC_RESOURCES = './resources';
export const KEY_LOCATION = './resources/key.pem';
export const CERT_LOCATION = './resources/cert.pem';
export const PUBLIC_LOCATION = './resources/public.pem';
export const PRIVATE_LOCATION = './resources/private.pem';
export const USERS_TABLE = 'Users';
export const TRANSACTIONS_TABLE = 'Transactions';

//response messages
export const ACCOUNT_EXISTS_LOG = 'An account with that email already exists.';
export const ACCOUNT_CREATION_MESSAGE = 'Account created successfully!';
export const ACCOUNT_DELETED_MESSAGE = 'Account deleted';
export const TRANSACTION_FOUND = 'Found Transaction';
export const TRANSACTION_NOT_FOUND = 'Transaction Not Found';

//request logging
export const JWT_VERIFY_LOG = 'ATTEMPTING TO VERIFY';
export const JWT_SUCCESS_LOG = 'VERIFICATION SUCCEEDED';
export const JWT_FAILURE_LOG = 'VERIFICATION FAILED';
export const STRIPE_ERROR = 'ERROR WITH STRIPE';
export const INVALID_PASS_MATCH = 'INVALID PASSWORD MATCH';
export const START_UP_MESSAGE = 'EXPRESS SERVER LISTENING ON PORT ';
export const SUCCESS = 'SUCCESS.';
export const READ_REQ_LOG = 'READ REQUEST.';
export const CREATE_REQ_LOG = 'CREATE REQUEST.';
export const UPDATE_REQ_LOG = 'UPDATE REQUEST.';
export const VERIFY_REQ_LOG = 'VERIFY REQUEST.';
export const RATING_LOG = 'RATING REQUEST.';
export const DELETE_REQ_LOG = 'DELETE REQUEST.';
export const STRIPE_CREATE_CUSTOMER_ERROR = 'FAILED TO CREATE CUSTOMER.';

//client error response codes
export const CLIENT_ERROR_UA = 'UNAUTHORIZED.';
export const CLIENT_ERROR_A_NA = 'ACCOUNT NOT FOUND.';
export const CLIENT_ERROR_UA_T = 'TOKEN UNAUTHORIZED.';
export const CLIENT_ERROR_HB = 'BAD REQUEST.';
export const CLIENT_ERROR_AE = 'ACCOUNT ALREADY EXISTS.';
export const CLIENT_ERROR_RATING = 'RATING EXISTS ON TRANSACTION ALREADY.';
export const CLIENT_ERROR_TRANSACTION_NA = 'TRANSACTION NOT FOUND.';

//server error resonse codes
export const SERVER_ERROR = 'BACKEND SERVER ERROR.';
export const SERVER_ERROR_TO = 'SERVICE TIMEOUT';
export const DEFAULT_ERROR = {
        code: 'BAD GATEWAY.',
        message: 'DEFAULT ERROR RESPONSE.'
    };
