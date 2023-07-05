import * as express from 'express';
import { Express, NextFunction, Request, Response } from "express";
import profileRouter from './routes/profile';
import { APIError } from "./services/errorservice";
import "reflect-metadata";
import * as dotenv from 'dotenv'
import { sqlDB } from './data/management';
import * as routes from './routes';

dotenv.config();
sqlDB.initialize().then(async () => {
  const app: Express = express();
  app.use(express.json());

  Routes.forEach(route: Route => {
    (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
        const result = (new (route.controller as any))[route.action](req, res, next)
        if (result instanceof Promise) {
            result.then(result => result !== null && result !== undefined ? res.send(result) : undefined)

        } else if (result !== null && result !== undefined) {
            res.json(result)
        }
    })
})


  app.use('/profiles', profileRouter);
  app.use(errorMW);
  app.listen(3000, () => {
    console.log('Server started on port 3000');
  });

});

const errorMW = (err: APIError, req: Request, res: Response, next: NextFunction): Response<any> => {
  const { message, code } = err;
  console.error(message); // Log the error for debugging purposes
  return res.status(code).json(err);
};
