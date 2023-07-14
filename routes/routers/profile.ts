import * as express from 'express';
import { NextFunction, Request, RequestHandler, Response, Router } from 'express';
import { sqlDB } from '../../data/management';
import { User } from '../../data/models';
import { APIError, ProfileHandlerMethod } from '../../services/errorservice';
import { /*createProfileHandler as createProfile,*/
  getProfileByIdHandler as getProfileById ,
  getAllProfilesHandler
} from '../handlers/profile';

export class ProfileRouter {
  private static _router: Router = express.Router();

  static get router(): Router {
    this._router.get('/', getAllProfilesHandler);
    this._router.get('/:id', getProfileById);

    return this._router;
  }

}



