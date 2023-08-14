import { User } from "../data/models";
import { NewUser, NewUserResponse, UserUpdatedResponse } from "../data/models/user";
import { UserKey } from "../routes/handlers";
import { APIError, ErrorService, UserService } from '../services';

const userService = new UserService();

export const getAllUsers = async (): Promise<User[]> => {
  try {
    const allUsers: User[] = await userService.getAllPendingAndActiveUsers();
    return allUsers;
  } catch(err) {
    if (err.code) {
      if (err.message) {
        throw new APIError(err.code, err.message);
      }
      throw new APIError(err.code, ErrorService.defaultErrorMessage);
    } else {
      if (err.message) {
        throw new APIError(500, err.message);
      }

      throw ErrorService.defaultError();
    }
  }
};

// user clicks a profile in tree to view more info.. this profile is already mapped to id so we can grab profile directly from id
export const getUserById = async (userId: string): Promise<User[]> => {
  try {
    const user: User[] = await userService.getUserById(userId);
    return user;
  } catch(err) {
    if (err.code) {
      if (err.message) {
        throw new APIError(err.code, err.message);
      }
      throw new APIError(err.code, ErrorService.defaultErrorMessage);
    } else {
      if (err.message) {
        throw new APIError(500, err.message);
      }

      throw ErrorService.defaultError();
    }
  }
};

export const getPendingUsers = async (): Promise<User[]> => {
  try {
    const unregisteredUsers: User[] = await userService.getAllPendingUsers();
    return unregisteredUsers.length ? unregisteredUsers : null;
  } catch(err) {
    if (err.code) {
      if (err.message) {
        throw new APIError(err.code, err.message);
      }
      throw new APIError(err.code, ErrorService.defaultErrorMessage);
    } else {
      if (err.message) {
        throw new APIError(500, err.message);
      }

      throw ErrorService.defaultError();
    }
  }
};

export const getUsersByLastName = async (lastName: string): Promise<User[]> => {
  const lastNameFilter: Map<UserKey, string> = new Map([['last_name', lastName]]);
  try {
    const users: User[] = await userService.getUsersWhere(lastNameFilter);
    return users;
  } catch(err) {
    if (err.code) {
      if (err.message) {
        throw new APIError(err.code, err.message);
      }
      throw new APIError(err.code, ErrorService.defaultErrorMessage);
    } else {
      if (err.message) {
        throw new APIError(500, err.message);
      }

      throw ErrorService.defaultError();
    }
  }
};

export const getUsersWithFilters = async (filters: Map<UserKey, any>): Promise<User[]> => {// eslint-disable-line @typescript-eslint/no-explicit-any
  try {
    const filteredUsers: User[] = await userService.getUsersWhere(filters);
    return filteredUsers;
  } catch(err) {
    if (err.code) {
      if (err.message) {
        throw new APIError(err.code, err.message);
      }
      throw new APIError(err.code, ErrorService.defaultErrorMessage);
    } else {
      if (err.message) {
        throw new APIError(500, err.message);
      }

      throw ErrorService.defaultError();
    }
  }
};

export const createNewUser = async(user: NewUser): Promise<NewUserResponse> => {
  try {
    const newUser: NewUserResponse = await userService.createNewRegisteredUser(user);
    return newUser;
  } catch(err) {
    if (err.code) {
      if (err.message) {
        throw new APIError(err.code, err.message);
      }
      throw new APIError(err.code, ErrorService.defaultErrorMessage);
    } else {
      if (err.message) {
        throw new APIError(500, err.message);
      }

      throw ErrorService.defaultError();
    }
  }
};

export const updateEmail = async(user_id: number, email: string): Promise<UserUpdatedResponse> => {
  try {
    //TODO(afowose) - send control to some email verification service. and await it's response, then
    const response = await userService.updateUserEmail(user_id, email);
    return response;
  } catch(err) {
    if (err.code) {
      if (err.message) {
        throw new APIError(err.code, err.message);
      }
      throw new APIError(err.code, ErrorService.defaultErrorMessage);
    } else {
      if (err.message) {
        throw new APIError(500, err.message);
      }

      throw ErrorService.defaultError();
    }
  }
};

export const findExistenceForUpdate = async(user_id: string): Promise<boolean> => {
  try {
    const userExists = await userService.findExistenceForUpdate(user_id);
    return userExists;
  } catch(err) {
    if (err.code) {
      if (err.message) {
        throw new APIError(err.code, err.message);
      }
      throw new APIError(err.code, ErrorService.defaultErrorMessage);
    } else {
      if (err.message) {
        throw new APIError(500, err.message);
      }

      throw ErrorService.defaultError();
    }
  }
};

export const doesUserExist = async(email: string, dob: Date): Promise<boolean> => {
  try {
    return await userService.doesUserExist(email, dob);
  } catch (err) {
    if (err.code) {
      if (err.message) {
        throw new APIError(err.code, err.message);
      }
      throw new APIError(err.code, ErrorService.defaultErrorMessage);
    } else {
      if (err.message) {
        throw new APIError(500, err.message);
      }

      throw ErrorService.defaultError();
    }
  }
};

export const isEmailTaken = async(email:string): Promise<boolean> => {
  try {
    return !!await userService.isEmailTaken(email);
  } catch(err) {
    if (err.code) {
      if (err.message) {
        throw new APIError(err.code, err.message);
      }
      throw new APIError(err.code, ErrorService.defaultErrorMessage)
    } else {
      if (err.message) {
        throw new APIError(500, err.message);
      }

      throw ErrorService.defaultError();
    }
  }
};
