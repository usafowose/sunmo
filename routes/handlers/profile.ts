import { NextFunction, Request, RequestHandler, Response } from "express";

import { getProfileById, getAllProfiles } from '../../controllers/profileController';
import { Profile } from '../../data/models';
import  { APIError, APIRoute, ErrorService, ProfileHandlerMethod, } from '../../services/errorservice';
import { SunmoResponse } from "../../utils/SunmoResponse";

export const getProfileByIdHandler: RequestHandler<{ id: string }> = async (
  req: Request<{ id: string }>,
  res: Response<Profile>,
  next: NextFunction
): Promise<Response<Profile>> => {
  const { id } = req.params;
  if (!id) {
    next(ErrorService.getError(APIRoute.PROFILES, ProfileHandlerMethod.GETPROFILE, 400));
  }
  try {
    const profileById = await getProfileById(id);
    return res.status(200).json(profileById);
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
