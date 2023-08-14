import { NextFunction, Request, RequestHandler, Response } from "express";

import { getProfileById, getAllProfiles } from '../../controllers/profileController';
import { Profile } from '../../data/models';
import  { APIError, APIRoute, ErrorService, ProfileHandlerMethod, } from '../../services/errorservice';

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
  res: Response<Profile[] | null>,
  next: NextFunction
): Promise<Response<Profile[] | null>> => {
  try {
    const allFamilyProfiles: Profile[] = await getAllProfiles();
    return res.status(200).send(allFamilyProfiles);
  } catch (err) {
    next(err);
  }
};
