import * as express from 'express';
import { Express, NextFunction, Request, Response } from "express";
import { APIError } from "./services/errorservice";
import "reflect-metadata";
import * as dotenv from 'dotenv'
import { sqlDB } from './data/management';
import { Routes } from './routes';
import { User } from './data/models';

dotenv.config();

sqlDB.initialize().then(async () => {

  const app: Express = express();
  app.use(express.json());

  Routes.forEach(({baseRoute, entityRouter}) => {
    (app as Express)["use"](baseRoute, entityRouter);
  });

  app.use(errorMW);
  
  await sqlDB.manager.save(
    sqlDB.manager.create(User, {
        firstName: "Timber",
        lastName: "Saw",
        age: 27,
    })
  )

  await sqlDB.manager.save(
    sqlDB.manager.create(User, {
        firstName: "Phantom",
        lastName: "Assassin",
        age: 24
    })
  )
  app.listen(3000, () => {
    console.log('Server started on port 3000. Open http://localhost:3000/users to see results');
  });

});

const errorMW = (err: APIError, req: Request, res: Response, next: NextFunction): Response<any> => {
  const { message, code } = err;
  console.error(message); // Log the error for debugging purposes
  return res.status(code).json(err);
};
