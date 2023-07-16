import { NextFunction, Request, RequestHandler, Response } from "express";
import { sqlDB } from "../../data/management";
import { User } from '../../data/models';
import { getAllUsers, getPendingUsers, getUserById, getUsersByLastName} from '../../controllers/userController';
import  { APIError, APIRoute, ErrorService, ProfileHandlerMethod, } from '../../services';

export interface PasswordResetPayload {
  userId: string;
  newPassword: string;
}

export const getAllUsersHandler: RequestHandler = async (
  req: Request,
  res: Response<User[]>,
  next: NextFunction
): Promise<Response<User[]>> => {
  try {
    const users: User[] = await getAllUsers();
    return res.status(200).send(users);
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

export const getUserByIdHandler: RequestHandler<{id: string}> = async (
  req: Request<{id: string}>,
  res: Response<User>,
  next: NextFunction
): Promise<Response<User>> => {
  const userId: string = req.params?.id;

  if (!userId) {
    next(ErrorService.getMissingReqParamsError(req.params, 'id'));
  }
  try {
    const userById: User = await getUserById(userId);
    return res.status(200).send(userById);
  } catch (err) {
    next(err)
  }
}

export const getUsersByLastNameHandler: RequestHandler<{lastName: string}> = async (
  req: Request<{lastName: string}>,
  res: Response<User[]>,
  next: NextFunction
): Promise<Response<User[]>> => {
  const lastName: string = req.params?.lastName;

  if (!lastName) {
    next(ErrorService.getMissingReqParamsError(req.params, 'lastName'));
  }
  try {
    const usersWithLastName: User[] = await getUsersByLastName(lastName);
    return res.status(200).send(usersWithLastName);
  } catch (err) {
    next(err);
  }
}

export const resetPassword: RequestHandler<PasswordResetPayload> = async (
  req: Request<ParamsDictionary, any, { id: string }>,
  res: Response<void>,
  next: NextFunction
): Promise<Response<void>> => {
  req.body.
  if (!req.params.userId || !req.)
  try {
    
  } catch (error) {
    
  }
}
