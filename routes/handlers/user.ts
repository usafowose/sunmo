import { NextFunction, Request, RequestHandler, Response } from "express";
import { sqlDB } from "../../data/management";
import { User } from '../../data/models';
import { 
  getAllUsers, getPendingUsers, getUserById, getUsersWithFilters,
  // resetUserPassword, updateEmail
} from '../../controllers/userController';
import  { APIError, APIRoute, ErrorService, ProfileHandlerMethod, } from '../../services';
import { mockUserInput } from "../../data/mock/user";
import { createFilterMapFromRequest } from "../../utils/filtermap";

export type UserKey = keyof Partial<Pick<User, 'first_name' | 'email' | 'last_name' | 'user_name'>>;

export interface PasswordResetPayload {
  userId: string;
  newPassword: string;
}

export const getUsersHandler: RequestHandler = async (
  req: Request,
  res: Response<User[]>,
  next: NextFunction
): Promise<Response<User[]>> => {
  try {
    if (!!Object.keys(req.query).length) {
      let filters = createFilterMapFromRequest<UserKey>(req.query, mockUserInput);
      const filteredUsers: User[] = await getUsersWithFilters(filters);
      return res.status(200).send(filteredUsers);
    }
    const allUsers: User[] = await getAllUsers();
    return res.status(200).send(allUsers);
  } catch (err) {
    const error = err as APIError;
    next(error);
  }
}

export const getUnregisteredUsersHandler: RequestHandler = async (
  req: Request,
  res: Response<User[]>,
  next: NextFunction
): Promise<Response<User[]>> => {
  try {
    const unregisteredUsers: User[] = await getPendingUsers();
    return res.status(200).send(unregisteredUsers);
  } catch(err) {
    next(err);
  }
}

export const getUserByIdHandler: RequestHandler<{}, User[], any, { [key: string]: string }> = async (
  req: Request,
  res: Response<User[]>,
  next: NextFunction
): Promise<Response<User[]>> => {
  const userId: string = req.params?.id;

  if (!userId) {
    next(ErrorService.getMissingReqParamsError(req.params, 'id'));
  }
  try {
    const userById: User[] = await getUserById(userId);
    return res.status(200).send(userById);
  } catch (err) {
    next(err)
  }
}

// export const resetPassword: RequestHandler<{}, any, PasswordResetPayload> = async (
//   req: Request<{}, any, PasswordResetPayload>,
//   res: Response<void>,
//   next: NextFunction,
// ): Promise<Response<void>> => {
//   const { body: reqBody } = req;
//   if (!reqBody?.userId || !reqBody?.newPassword) {
//     throw new APIError(400, 'No password provided');
//   }

//   try {
//     await resetUserPassword(reqBody.userId, reqBody.newPassword);
//     return res.status(200);
//   } catch (err) {
//     next(err);
//   }
// }

// export const updateEmailHandler: RequestHandler<{}, any, Pick<User, 'email' | 'user_id'> & Partial<Pick<User, 'user_name'>>> = async (
//   req: Request<{}, any, Pick<User, 'email' | 'user_id'> & Partial<Pick<User, 'user_name'>>>,
//   res: Response,
//   next: NextFunction
// ): Promise<void> => {
//   const { user_id, email } = req.body;
//   if (!user_id || !email) {
//     throw(new APIError(500))
//   }
//   try {
//     await updateEmail(String(user_id), email);
//   } catch (err) {
//     next(err);
//   }
// }
