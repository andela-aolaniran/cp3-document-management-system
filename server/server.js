// fetch dependencies
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import UserRoutes from './routes/UserRoutes';
import DocumentRoutes from './routes/DocumentRoutes';
import RoleRoutes from './routes/RoleRoutes';

const app = express();

// use morgan for logging out requests to the console
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
  res.status(200).send('Welcome to cp3_document_management_system');
});

// set up User related routes
UserRoutes.setUserRoutes(app);

// set up Document related routes
DocumentRoutes.setDocumentRoutes(app);

// set up Roles related routes
RoleRoutes.setRoleRoutes(app);

export default app;
