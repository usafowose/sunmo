import { User } from "../data/models";
import { APIError, ErrorService, UserService } from '../services';


const userService = new UserService();

export const getAllUsers = async (): Promise<User[]> => {
  try {
    const allUsers: User[] = await userService.getAllPendingAndActiveUsers();
    return allUsers;
  } catch (err) {
    if (err.code) {
      if (err.message) {
        throw new APIError(err.message, err.code);
      }
      throw new APIError(ErrorService.defaultErrorMessage, err.code)
    } else {
      if (err.message) {
        throw new APIError(err.message, 500);
      }
      throw ErrorService.defaultError();
    }
  }
}

// user clicks a profile in tree to view more info.. this profile is already mapped to id so we can grab profile directly from id
export const getUserById = async (userId: string): Promise<User> => {
  try {
    
  } catch (err) {
    if (err.code) {
      if (err.message) {
        throw new APIError(err.message, err.code);
      }
      throw new APIError(ErrorService.defaultErrorMessage, err.code)
    } else {
      if (err.message) {
        throw new APIError(err.message, 500);
      }
      throw ErrorService.defaultError();
    }
  }
}

export const getAllUnregisteredUsers = async (): Promise<User[]> => {
  try {
    
  } catch (err) {
    if (err.code) {
      if (err.message) {
        throw new APIError(err.message, err.code);
      }
      throw new APIError(ErrorService.defaultErrorMessage, err.code)
    } else {
      if (err.message) {
        throw new APIError(err.message, 500);
      }
      throw ErrorService.defaultError();
    }
  }
}

export const getUserByLastName = async (): Promise<User[]> => {
  try {
    
  } catch (err) {
    if (err.code) {
      if (err.message) {
        throw new APIError(err.message, err.code);
      }
      throw new APIError(ErrorService.defaultErrorMessage, err.code)
    } else {
      if (err.message) {
        throw new APIError(err.message, 500);
      }
      throw ErrorService.defaultError();
    }
  }
}