import { Express } from 'express';
import Create from '../services/create';
import Read from '../services/read';
import Update from '../services/update'
import Delete from '../services/delete'

export class Routes {

    public routes(app: Express): void {
        app.post('/createAccount', Create.account);

        app.route('/readAccount')
            .get(Read.account)
            .post(Read.account);

        app.route('/updateAccount')
            .post(Update.account)
            .get(Update.verify);

        app.delete('/deleteAccount', Delete.account);
    }
}
