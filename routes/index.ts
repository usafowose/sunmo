import { Router } from 'express';

import { ProfileRouter } from './routers/profile';
import { UserRouter } from './routers/user';

export interface RouteConfig {
  baseRoute: string,
  entityRouter: Router,
}

export const Routes: RouteConfig[] = [
  {
    baseRoute: '/profiles',
    entityRouter: ProfileRouter.router
  }, {
    baseRoute: '/users',
    entityRouter: UserRouter.router
  }
];
