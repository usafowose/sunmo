import { Router } from "express";
import * as express from 'express';
import { getUsersHandler, getUnregisteredUsersHandler, getUserByIdHandler, createNewUserHandler, renderFallbackPage /* updateEmailHandler */ } from "../handlers";

export class UserRouter {
  private static _router: Router = express.Router();

  /**
   * @summary All routes are subroutes under the prepended route path '/users
   */
  static get router(): Router {
    // this._router.use(authMiddleWare) // any middleware specific to this route like auth,

    this._router.get('/', [/*authMiddleware*/ getUsersHandler]);
    this._router.get('/unregistered', [getUnregisteredUsersHandler]);
    this._router.get('/:id', [getUserByIdHandler]);

    this._router.post('/', [createNewUserHandler]);

    // this._router.post('/reset-password', [/*authMiddleware*/, /*tokenMiddleware*/]);
    // this._router.post('/update-password', [/*authMiddleware*/, /*tokenMiddleware*/]);


    // this.router.patch('/updateEmail', updateEmailHandler);

    this._router.all('*', [renderFallbackPage]);

    return this._router;
  }
}
