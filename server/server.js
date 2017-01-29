// fetch dependencies
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import logger from 'fm-log'
import UsersRoutes from './routes/UsersRoutes';

const app = express();

// use morgan for logging out requests to the console
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
  res.status(200).send('Welcome to cp3_document_management_system');
});

// set up User related routes
UsersRoutes.setUserRoutes(app);

const port = process.env.PORT || 3090;
app.listen(port, () => {
  logger.info(`Server listenening on port ${port}`);
});
