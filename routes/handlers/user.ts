import { NextFunction, Request, RequestHandler, Response } from "express";

import {
  getAllUsers, getPendingUsers, getUserById, getUsersWithFilters, createNewUser, doesUserExist, updateEmail, findExistenceForUpdate, isEmailTaken,
} from '../../controllers/userController';
import { mockUserInput } from "../../data/mock/user";
import { User } from '../../data/models';
import { NewUser, NewUserResponse, UpdateEmailRequestBody, UserUpdatedResponse } from "../../data/models/user";
import  { APIError, ErrorService, } from '../../services';
import { createFilterMapFromRequest } from "../../utils/filtermap";
import { SunmoResponse } from "../../utils/SunmoResponse";

export type UserKey = keyof Partial<Pick<User, 'first_name' | 'email' | 'last_name' | 'user_name'>>;

export interface PasswordResetPayload {
  userId: string;
  newPassword: string;
}

export const getUsersHandler: RequestHandler = async (
  req: Request,
  res: Response<SunmoResponse<User[]>>,
  next: NextFunction
): Promise<Response<SunmoResponse<User[]>>> => {
  try {
    if (Object.keys(req.query).length) {
      const filters = createFilterMapFromRequest<UserKey>(req.query, mockUserInput);
      const filteredUsers: User[] = await getUsersWithFilters(filters);

      const response = new SunmoResponse<User[]>(200, undefined, filteredUsers);
      return res.status(200).json(response);
    }
    const allUsers: User[] = await getAllUsers();
    const response = new SunmoResponse<User[]>(200, null, allUsers);

    return res.status(200).json(response);
  } catch (err) {
    const error = err as APIError;
    next(error);
  }
};

export const getUnregisteredUsersHandler: RequestHandler = async (
  req: Request,
  res: Response<SunmoResponse<User[]>>,
  next: NextFunction
): Promise<Response<SunmoResponse<User[]>>> => {
  try {
    const unregisteredUsers: User[] = await getPendingUsers();
    const response = new SunmoResponse<User[]>(200, null, unregisteredUsers);
    return res.status(200).json(response);
  } catch(err) {
    next(err);
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getUserByIdHandler: RequestHandler<{id: string}, SunmoResponse<User[]>, any, any> = async (
  req: Request<{id: string}>,
  res: Response<SunmoResponse<User[]>>,
  next: NextFunction
): Promise<Response<SunmoResponse<User[]>>> => {
  const userId: string = req.params?.id;

  if (!userId) {
    next(ErrorService.getMissingReqParamsError(req.params, 'id'));
    return;
  }

  if (isNaN(Number(userId))) {
    renderFallbackPage(req, res, next);
    return;
  }

  try {
    const usersById: User[] = await getUserById(userId);
    const response = new SunmoResponse<User[]>(200, null, usersById);
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

export const createNewUserHandler: RequestHandler<{ [key: string]: string }, SunmoResponse<NewUserResponse | void>, NewUser> = async (
  req: Request<{ [key: string]: string }, SunmoResponse<NewUserResponse | void>, NewUser>,
  res: Response<SunmoResponse<NewUserResponse | void>>,
  next: NextFunction,
): Promise<Response<SunmoResponse<NewUserResponse | void>>> => {
  const { body } = req;
  const { dob, email } = body;
  try {
    const userExists = await doesUserExist(email, dob);
    if (userExists) {
      const response = new SunmoResponse<void>(409, 'Conflict: User Exists', null);
      return res.status(409).json(response);
    }

    const newUserData: NewUserResponse = await createNewUser(body);
    const response = new SunmoResponse<NewUserResponse>(201, null, newUserData);
    return res.status(201).json(response);
  } catch(err) {
    next(err);
  }
};

export const renderFallbackPage: RequestHandler = (
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  return res.status(404).render('fallback');
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateEmailHandler: RequestHandler<{ [key: string]: string }, SunmoResponse<UserUpdatedResponse | void>, UpdateEmailRequestBody> = async (
  req: Request<{ [key: string]: string }, SunmoResponse<UserUpdatedResponse | void>, UpdateEmailRequestBody>, // eslint-disable-line @typescript-eslint/no-explicit-any
  res: Response<SunmoResponse<UserUpdatedResponse | void>>,
  next: NextFunction
): Promise<Response<SunmoResponse<UserUpdatedResponse | void>>> => {
  const { user_id, email } = req.body;
  if (!user_id || !email) {
    const response = new SunmoResponse<void>(400, 'No User Found', null);
    return res.status(400).json(response);
  }

  if (isNaN(Number(user_id))) { // (Move to validation?)
    const response = new SunmoResponse<void>(400, 'Bad Request: User ID must be a number');
    return res.status(400).json(response);
  }

  try {
    const userExists = await findExistenceForUpdate(String(user_id));
    if (!userExists) {
      const response = new SunmoResponse<void>(404, 'No User Found', null);
      return res.status(404).json(response);
    }

    const emailTaken = await isEmailTaken(email);
    if (emailTaken) {
      const response = new SunmoResponse<void>(409, 'Conflict: Email Taken', null);
      return res.status(409).json(response);
    }

    const updatedUserInfo: UserUpdatedResponse = await updateEmail(user_id, email);
    const response = new SunmoResponse<UserUpdatedResponse>(200, null, updatedUserInfo);
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};
