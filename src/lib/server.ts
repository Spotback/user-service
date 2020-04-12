import * as https from 'https';
import * as fs from 'fs';
import * as Constants from '../utils/constants';
import * as _ from 'lodash';

const secureEnv = require('secure-env');
_.merge(process.env, secureEnv({secret: process.env.CONF_ENC_UNLOCK}));

import app from './app';

const httpsOptions = {
    key: fs.readFileSync(Constants.KEY_LOCATION),
    cert: fs.readFileSync(Constants.CERT_LOCATION)
}

const PORT = process.env.PORT;

https.createServer(httpsOptions, app).listen(PORT, () => {
    console.log(Constants.START_UP_MESSAGE + PORT);
});
