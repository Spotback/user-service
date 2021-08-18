import { Express } from 'express';
import Create from '../services/create';
import Read from '../services/read';
import Update from '../services/update'
import Delete from '../services/delete'
import Rate from '../services/rate';

export class Routes {

    public routes(app: Express): void {
        app.get('/ping', (req, res) => {
            res.status(200).send();
        })
        app.post('/createAccount', Create.account);

        app.route('/readAccount')
            .get(Read.account)
            .post(Read.account);

        app.route('/updateAccount')
            .post(Update.account)
            .get(Update.verify);

        app.post('/updateRating', Rate.account);

        app.delete('/deleteAccount', Delete.account);
    }
}
