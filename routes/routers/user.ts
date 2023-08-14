import { Router } from "express";
import * as express from 'express';

import { getUsersHandler, getUnregisteredUsersHandler, getUserByIdHandler, createNewUserHandler, renderFallbackPage, /* updateEmailHandler */
updateEmailHandler} from "../handlers";

export class UserRouter {
  private static _router: Router = express.Router();

  /**
   * @summary All routes are subroutes under the prepended route path '/users
   */
  static get router(): Router {
    //TODO(afowose): implement auth middleware for each request; this._router.use(authMiddleWare) // any middleware specific to this route like auth,

    this._router.get('/', [/*authMiddleware*/ getUsersHandler]);
    this._router.get('/unregistered', [getUnregisteredUsersHandler]);
    this._router.get('/:id', [getUserByIdHandler]);

    this._router.post('/', [createNewUserHandler]);

    this._router.patch('/update-email', [updateEmailHandler]);

    this._router.all('*', [renderFallbackPage]);

    return this._router;
  }
}
