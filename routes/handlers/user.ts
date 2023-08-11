import { NextFunction, Request, RequestHandler, Response } from "express";
import { sqlDB } from "../../data/management";
import { User } from '../../data/models';
import { 
  getAllUsers, getPendingUsers, getUserById, getUsersWithFilters, createNewUser, doesUserExist, updateEmail,
  // resetUserPassword, updateEmail
} from '../../controllers/userController';
import  { APIError, APIRoute, ErrorService, ProfileHandlerMethod, } from '../../services';
import { mockUserInput } from "../../data/mock/user";
import { createFilterMapFromRequest } from "../../utils/filtermap";
import { NewUser, NewUserResponse, UserUpdatedResponse } from "../../data/models/user";

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

  if (isNaN(Number(userId))) {
    renderFallbackPage(req, res, next);
    return;
  }

  try {
    const userById: User[] = await getUserById(userId);
    return res.status(200).send(userById);
  } catch (err) {
    next(err)
  }
}

export const createNewUserHandler: RequestHandler<{}, NewUserResponse, NewUser> = async (
  req: Request<{}, NewUserResponse, NewUser>,
  res: Response<NewUserResponse>,
  next: NextFunction,
): Promise<Response<NewUserResponse>> => {
  const { body } = req;
  const { dob, email } = body;
  try {
    const userExists = await doesUserExist(email, dob);
    if (userExists) {
      return res.status(409).send();
    }

    const newUserData: NewUserResponse = await createNewUser(body);
    return res.status(201).send(newUserData);
  } catch(err) {
    next(err);
  }
}

export const renderFallbackPage: RequestHandler = (
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  return res.status(404).render('fallback');
}

export const updateEmailHandler: RequestHandler<{}, any, Pick<User, 'email' | 'user_id'> & Partial<Pick<User, 'user_name'>>> = async (
  req: Request<{}, any, Pick<User, 'email' | 'user_id'> & Partial<Pick<User, 'user_name'>>>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { user_id, email } = req.body;
  if (!user_id || !email) {
    res.status(401).send();
    return;
  }

  if (isNaN(Number(user_id))) {
    res.status(404).send(); //TODO(AFOWOSE): Send unified response object
    return;
  }

  try {
    const updatedUserInfo: UserUpdatedResponse<'email'> = await updateEmail(user_id, email);
    res.status(200).send(updatedUserInfo);
  } catch (err) {
    next(err);
  }
}
