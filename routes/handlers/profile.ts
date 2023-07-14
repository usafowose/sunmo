import { NextFunction, Request, RequestHandler, Response } from "express";
import { Profile } from '../../data/models';
import  { APIError, APIRoute, ErrorService, ProfileHandlerMethod, } from '../../services/errorservice';
import {/* updateProfile createProfile, */ getProfileById, getAllProfiles } from '../../controllers/profileController';

//Id should be passed in via request parameters
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
}

export const getAllProfilesHandler: RequestHandler = async (
  req: Request,
  res: Response<Profile[] | null>,
  next: NextFunction
): Promise<Response<Profile[] | null>> => {
  try {
    const allFamilyProfiles: Profile[] = await getAllProfiles();
    return res.status(200).send(allFamilyProfiles);
  } catch (err) {
    const error = err as APIError;
    // next(error);
  }
}

//Profile should be passed in as request body
// export const createProfileHandler: RequestHandler<{}, {}, Profile> = async (
//   req: Request<{}, {}, Profile>,
//   res: Response<Profile>,
//   next: NextFunction
// ): Promise<Response<Profile> | void> => {
//   if (!req?.body) {
//     next(ErrorService.getError(APIRoute.PROFILES, ProfileHandler.CREATEPROFILE, 400));
//   }
//   try {
//     const profileToCreate = req.body;
//     const createdProfile = await createProfile(profileToCreate);
//     return res.status(201).json(createdProfile);
//   } catch (e) { // only the data access layer, service, or inner method throws will actually surface and create this error and pass it down the stack via catch block here.
//     let error = e as APIError;
//     next(error);
//   }
// };

//TODO (andrewfowose): Create other handler function to be passed into routes array for this entity's routes (profile's routes)


