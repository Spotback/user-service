import app from './app';
import * as https from 'https';
import * as fs from 'fs';
import * as Constants from '../utils/constants';

const httpsOptions = {
    key: fs.readFileSync(Constants.KEY_LOCATION),
    cert: fs.readFileSync(Constants.CERT_LOCATION)
}

const PORT = process.env.PORT;

https.createServer(httpsOptions, app).listen(PORT, () => {
    console.log(Constants.START_UP_MESSAGE + PORT);
});
