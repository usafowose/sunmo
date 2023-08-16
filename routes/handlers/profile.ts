import { NextFunction, Request, RequestHandler, Response } from "express";

import { getProfileById, getAllProfiles } from '../../controllers/profileController';
import { Profile } from '../../data/models';
import  { APIError, APIRoute, ErrorService, ProfileHandlerMethod, } from '../../services/errorservice';
import { SunmoResponse } from "../../utils/sunmo-response";

export const getProfileByIdHandler: RequestHandler<{ id: string }, SunmoResponse<Profile> > = async (
  req: Request<{ id: string }>,
  res: Response<SunmoResponse<Profile>>,
  next: NextFunction
): Promise<Response<SunmoResponse<Profile>>> => {
  const { id } = req.params;
  if (!id) {
    next(ErrorService.getError(APIRoute.PROFILES, ProfileHandlerMethod.GETPROFILE, 400));
  }
  try {
    const profileById: Profile = await getProfileById(id);

    const response = new SunmoResponse<Profile>(200, null, profileById);
    return res.status(200).json(response);
  } catch (err) {
    const error = err as APIError;
    next(error);
  }
};

export const getAllProfilesHandler: RequestHandler = async (
  req: Request,
  res: Response<SunmoResponse<Profile[] | null>>,
  next: NextFunction
): Promise<Response<SunmoResponse<Profile[] | null>>> => {
  try {
    const allFamilyProfiles: Profile[] = await getAllProfiles();
    const response: SunmoResponse<Profile[]> = new SunmoResponse(200, null, allFamilyProfiles);
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};
