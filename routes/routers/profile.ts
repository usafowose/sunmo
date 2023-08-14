import * as express from 'express';
import { Router } from 'express';

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
