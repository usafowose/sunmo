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
    const user: User = await userService.getUserById(userId);
    return user;
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

export const getPendingUsers = async (): Promise<User[]> => {
  try {
    const unregisteredUsers: User[] = await userService.getPendingUsers();
    return unregisteredUsers.length ? unregisteredUsers : null;
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

export const getUserByLastName = async (lastName: string): Promise<User[]> => {
  try {
    const users: User[] = await userService.getUserByAttribute('last_name', lastName);
    return users;
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

export const resetUserPassword = (userId: string, newPassword): Promise<void> => {
    return Promise.resolve();
}

export const changeUserName = async (newUserName: string): Promise<void> => {
  try {
    await userService.changeUserName(newUserName);
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

export const changeUserEmail = async (newEmail: string): Promise<void> => {
  try {
    await userService.changeUserEmail(newEmail);
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