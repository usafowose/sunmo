import { Profile, NewProfile } from "../data/models/profile";
import { APIError, APIRoute, ErrorService, ProfileHandlerMethod } from "../services/errorservice";
import {ProfileService} from '../services/profile';

const profileService = new ProfileService();

export const getAllProfiles = async (): Promise<Profile[]> => {
  try {
    const allProfiles: Profile[] = await profileService.getAllProfiles();

    return allProfiles;
  } catch (err) {
    const error = err as APIError;
    throw(error);
  }
}

// user clicks a profile in tree to view more info.. this profile is already mapped to id so we can grab profile directly from id
export const getProfileById = async (profileId: string): Promise<Profile> => {
  try {
    const profile: Profile | null = await profileService.getProfileById(profileId);
    if (!profile) {
      throw ErrorService.getError(APIRoute.PROFILES, ProfileHandlerMethod.GETPROFILE, 404);
    }

    return profile;
  } catch(err) {
      throw(err);
  }
}


