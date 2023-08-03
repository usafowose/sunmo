import { User } from "../data/models";
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
      throw new APIError(err.code, ErrorService.defaultErrorMessage)
    } else {
      if (err.message) {
        throw new APIError(500, err.message);
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
}

export const getPendingUsers = async (): Promise<User[]> => {
  try {
    const unregisteredUsers: User[] = await userService.getAllPendingUsers();
    return unregisteredUsers.length ? unregisteredUsers : null;
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
}

export const getUsersByLastName = async (lastName: string): Promise<User[]> => {
  const lastNameFilter: Map<UserKey, any> = new Map([['last_name', lastName]]);
  try {
    const users: User[] = await userService.getUsersWhere(lastNameFilter);
    return users;
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
}

// export const resetUserPassword = (userId: string, newPassword): Promise<void> => {
//     return Promise.resolve();
// }

// export const changeUserName = async (newUserName: string): Promise<void> => {
//   try {
//     await userService.changeUserName(newUserName);
//   } catch(err) {
//     if (err.code) {
//       if (err.message) {
//         throw new APIError(err.code, err.message);
//       }
//       throw new APIError(err.code, ErrorService.defaultErrorMessage)
//     } else {
//       if (err.message) {
//         throw new APIError(500, err.message);
//       }

//       throw ErrorService.defaultError();
//     }
//   }
// }

// export const changeUserEmail = async (userId: string, newEmail: string): Promise<void> => {
//   try {
//     await userService.changeUserEmail(userId, newEmail);
//   } catch(err) {
//     if (err.code) {
//       if (err.message) {
//         throw new APIError(err.code, err.message);
//       }
//       throw new APIError(err.code, ErrorService.defaultErrorMessage)
//     } else {
//       if (err.message) {
//         throw new APIError(500, err.message);
//       }

//       throw ErrorService.defaultError();
//     }
//   }
// }

export const getUsersWithFilters = async (filters: Map<UserKey, any>): Promise<User[]> => {
  try {
    const filteredUsers: User[] = await userService.getUsersWhere(filters);
    return filteredUsers;
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
}
