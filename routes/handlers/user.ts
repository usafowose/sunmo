import { NextFunction, Request, RequestHandler, Response } from "express";
import { sqlDB } from "../../data/management";
import { User } from '../../data/models';
import { getUnregisteredUser, getAllUsers } from '../../controllers/userController';
import  { APIError, APIRoute, ErrorService, ProfileHandlerMethod, } from '../../services/errorservice';

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
    const unregisteredUsers: User[] = await getUnregisteredUsers();
    return res.status(200).send(unregisteredUsers);
  } catch(err) {
    next(err);
  }
}
