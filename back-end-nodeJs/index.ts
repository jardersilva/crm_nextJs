import express, { Request, Response, NextFunction } from 'express';
import Routers from './src/routes/v1';
import * as Sentry from "@sentry/node";
import dotenv from "dotenv";
import connectDB from './src/config/database';
import AppError from './src/middleware/CustomError';

dotenv.config({
  path: ".env"
});

const cors = require('cors');

const app = express();
const server = require('http').Server(app);
connectDB();

app.use(express.json());
app.use(Sentry.Handlers.requestHandler());
app.use(cors());
app.use(express.static('assets'));
app.use('/api/v1', Routers);

app.use((err: any, req: Request, res: Response, _: NextFunction) => {

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  console.log("Erro:: ");
  console.log(err);

  res.status(err.statusCode)
  res.json({
    status: err.status,
    message: err.message,
  })
});



server.listen(process.env.APP_PORT || 3333);
