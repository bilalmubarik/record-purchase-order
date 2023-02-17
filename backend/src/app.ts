import express, { Express } from 'express';
import routes from './routes/v1';

const app: Express = express();

// v1 api routes
app.use('/v1', routes);

export default app;