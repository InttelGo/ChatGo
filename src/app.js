import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import CookieParser from "cookie-parser";
import authRoutes from './routes/auth.routes.js';
import webhookRoutes from './routes/webhook.routes.js';

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.json());
// Cookie parser middleware
app.use(CookieParser());

//RUTAS

//webhook
app.use(webhookRoutes); 
app.use('/api', authRoutes);

export default app;
