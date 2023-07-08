import { RequestHandler, Router } from 'express';
import { ProfileRouter, TestUserRouter, } from './profile';

export interface RouteConfig {
  baseRoute: string,
  entityRouter: Router,
}

export const Routes: RouteConfig[] = [{
  baseRoute: '/profiles',
  entityRouter: ProfileRouter.router
}, {
  baseRoute: '/users',
  entityRouter: TestUserRouter.router
},]

