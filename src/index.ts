import express from 'express';
import bodyParser from 'body-parser';
import { PORT } from './config/server-config';
import { connect } from './config/db';
import ApiRoutes from './routes/index';

const app = express();

const setUpAndStartServer = () => {

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    app.use('/api', ApiRoutes);

    app.listen(PORT, async () => {
        console.log(`Server started at PORT:${PORT}`);
        await connect();
    });
}

setUpAndStartServer();
