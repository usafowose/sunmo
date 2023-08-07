import * as express from 'express';
import * as ejs from 'ejs';
import { Express, NextFunction, Request, Response } from "express";
import { APIError } from "./services/errorservice";
import "reflect-metadata";
// TODO(andrewfowose): implement internationalization for fallback page
import { sqlDB } from './data/management';
import { Routes } from './routes';
import { User } from './data/models';


sqlDB.initialize().then(async () => {

  const app: Express = express();
  
  app.use(express.json());

  Routes.forEach(({baseRoute, entityRouter}) => {
    (app as Express)["use"](baseRoute, entityRouter);
  });

  app.set('view engine', 'ejs');
  app.engine('html', ejs.renderFile);
  app.all('*', (_req: Request, res: Response, next: NextFunction) => {
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

const errorMW = (err: APIError, req: Request, res: Response, next: NextFunction): Response<any> => {
  const { message, code } = err;
  if (message) {
    console.error(message); //TODO(afowose) Log the error for debugging purposes via middleware or Logger class
  }

  return res.status(code).json(err);
};
