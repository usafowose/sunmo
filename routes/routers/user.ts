import { Router } from "express";
import * as express from 'express';
import { getUsersHandler, getUnregisteredUsersHandler, getUserByIdHandler, /* updateEmailHandler */ } from "../handlers";

export class UserRouter {
  private static _router: Router = express.Router();

  static get router(): Router {
    // this._router.use() // any middleware specific to this route like auth,

    this._router.get('/', [getUsersHandler]);
    this._router.get('/unregistered', [getUnregisteredUsersHandler]);
    this._router.get('/:id', [getUserByIdHandler]);

    // this._router.post('/reset-password', [/*authMiddleware*/, /*tokenMiddleware*/]);
    // this._router.post('/update-password', [/*authMiddleware*/, /*tokenMiddleware*/]);


    // this.router.patch('/updateEmail', updateEmailHandler);



    return this._router;
  }
}
