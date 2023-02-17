import express, { Express } from 'express';
import cors from 'cors';
import routes from './routes/v1';

const app: Express = express();

app.use(cors());

// v1 api routes
app.use('/v1', routes);

export default app;