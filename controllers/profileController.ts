import { Profile } from "../data/models";
import { APIError, APIRoute, ErrorService, ProfileHandlerMethod } from "../services/errorservice";
import {ProfileService} from '../services/profile';

const profileService = new ProfileService();

export const getAllProfiles = async (): Promise<Profile[]> => {
  try {
    const allProfiles: Profile[] = await profileService.getAllProfiles();

    return allProfiles;
  } catch (err) {
    if (err.code) {
      if (err.message) {
        throw new APIError(err.message, err.code);
      }
      throw new APIError(err.code, ErrorService.defaultErrorMessage)
    } else {
      if (err.message) {
        throw new APIError(500, err.message);
      }
      throw ErrorService.defaultError();
    }
  }
}

export const getProfileById = async (profileId: string): Promise<Profile> => {
  try {
    const profile: Profile = await profileService.getProfileById(profileId);
    return profile ?? null;

  } catch(err) {
    if (err.code) {
      if (err.message) {
        throw new APIError(err.message, err.code);
      }
      throw new APIError(err.code, ErrorService.defaultErrorMessage);
    } else {
      if (err.message) {
        throw new APIError(500, err.message);
      }
      throw ErrorService.defaultError();
    }
  }
}


