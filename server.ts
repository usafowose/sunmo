import * as ejs from 'ejs';
import * as express from 'express';
import { Express, NextFunction, Request, Response } from "express";
import "reflect-metadata";

// TODO(andrewfowose): implement internationalization for fallback page
import { sqlDB } from './data/management';
import { User } from './data/models';
import { Routes } from './routes';
import { APIError } from "./services/errorservice";
import { SunmoResponse } from './utils/SunmoResponse';

sqlDB.initialize().then(async () => {

  const app: Express = express();

  app.use(express.json());

  Routes.forEach(({baseRoute, entityRouter}) => {
    (app as Express)["use"](baseRoute, entityRouter);
  });

  app.set('view engine', 'ejs');
  app.engine('html', ejs.renderFile);
  app.all('*', (_req: Request, res: Response, _next: NextFunction) => {
    res.status(404).render('fallback');
  });
  app.use(errorMW);

  await sqlDB.manager.save([
    sqlDB.manager.create(User, {
      first_name: 'Andrew',
      last_name: 'Fowose',
      email: 'usafowose@gmail.com',
      dob: new Date()
    }),
    sqlDB.manager.create(User, {
      first_name: 'Andrew',
      last_name: 'Fowose',
      email: 'usafowose@hotmail.com',
      dob: new Date()
    }),
    sqlDB.manager.create(User, {
      first_name: 'Andrew',
      last_name: 'F',
      email: 'usafowose@yahoo.com',
      dob: new Date(),
      is_registered: true
    })
  ]);

const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}. Open http://localhost:${PORT} to see results`);
  });
});

const errorMW = (err: APIError, req: Request, res: Response, _next: NextFunction): Response<SunmoResponse<APIError | any>> => { // eslint-disable-line @typescript-eslint/no-explicit-any
  const { message, code } = err;
  if (message) {
    console.error(message); //TODO(afowose) Log the error for debugging purposes via middleware or Logger class
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const response = new SunmoResponse<APIError | any>(code, message, err);
  return res.status(code).json(response);
};
