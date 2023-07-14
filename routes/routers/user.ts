import { Router } from "express";
import * as express from 'express';
import { getAllUsersHandler, getUnregisteredUsersHandler } from "../handlers";

export class TestUserRouter {
  private static _router: Router = express.Router();

  static get router(): Router {
    this._router.get('/', getAllUsersHandler);
    this._router.get('/unregistered', getUnregisteredUsersHandler);

    return this._router;
  }
}
