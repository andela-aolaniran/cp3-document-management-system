// fetch dependencies
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';
import UserRoutes from '../routes/UserRoutes';
import DocumentRoutes from '../routes/DocumentRoutes';
import RoleRoutes from '../routes/RoleRoutes';

dotenv.config();
const app = express();
const router = express.Router();

// use morgan for logging out requests to the console
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// set up User related routes
UserRoutes.setUserRoutes(router);

// set up Document related routes
DocumentRoutes.setDocumentRoutes(router);

// set up Roles related routes
RoleRoutes.setRoleRoutes(router);

app.use(router);

export default app;
