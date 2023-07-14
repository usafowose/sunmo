import { RequestHandler, Router } from 'express';
import * as ProfileRouter from './routers/profile';
import * as UserRouter from './routers/user'

export interface RouteConfig {
  baseRoute: string,
  entityRouter: Router,
}

export const Routes: RouteConfig[] = [ {
  baseRoute: '/profiles',
  entityRouter: ProfileRouter.router
}, {
  baseRoute: '/users',
  entityRouter: TestUserRouter.router
}
// {
//   baseRoute: '*',
//   entityRouter: CatchAllRouter.router
// }
]

