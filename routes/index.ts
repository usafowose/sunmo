import { RequestHandler } from 'express';

export interface Route {
  method: string;
  route: string;
  handler: RequestHandler;
}
// all routes should be exported as routes from their respective routers here
export * from './profile';
// export * from './invitation';