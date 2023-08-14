import { Pool } from 'mysql2/promise';
import { Repository } from "typeorm";
import { UserKey } from '../../routes/handlers';

import { connectionManager1, sqlDB } from "../management";
import { User } from "../models";
import { CreateUserInput } from '../models/profile';
import { NewUser, NewUserResponse, UsersWhereFilter, UserUpdatedResponse } from '../models/user';
import { StandardQueryBuilder } from "../../utils/querybuilder";

export class UserAccessLayer {
  private _inbuiltConnection: Pool = connectionManager1.connectionPool;
  private _queryBuilder: StandardQueryBuilder = new StandardQueryBuilder();
  private _userRepo: Repository<User> = sqlDB.getRepository(User);

  constructor() { }

  async getAllUsers(): Promise<User[]> {
    try {
      const allUsers: User[] = await this._userRepo.find();
      return allUsers;
    } catch(err) {
      throw err;
    }
  }

  async getUserById(id: string): Promise<User[]> {
    try {
      const user = this._userRepo.findBy({ user_id: Number(id)} );
      return user;
    } catch(err) {
      throw err;
    }
  }

  async getAllActiveUsers(): Promise<User[]> {
    try {
      return await this._userRepo.find();
    } catch (err) {
      throw err;
    }
  }

  async createUnregisteredUser(user: CreateUserInput & Pick<User, 'is_registered'>): Promise<User> {
    try {
      const newUser = await this._userRepo.save(user);
      return newUser;
    } catch(err) {
      throw err;
    }
  }

  async getUsersWhere(userDataFilters: UsersWhereFilter): Promise<User[]> {
    try {
      const results = await this._userRepo.findBy(userDataFilters);
      return results;
    } catch(err) {
      throw err;
    }
  }

  async getUnregisteredUsers(): Promise<User[]> {
    try {
      return await this._userRepo.findBy({'is_registered': false});
    } catch (err) {
      throw err;
    }
  }

  async createRegisteredUser(user: NewUser): Promise<NewUserResponse> {
    try {
      const { user_id, user_name, first_name, last_name, dob, email } = await this._userRepo.save(user);
      return {
        user_id,
        user_name,
        first_name,
        last_name,
        dob,
        email
      };
    } catch(err) {
      throw err;
    }
  }

  async updateEmail(user_id: number, email: string): Promise<UserUpdatedResponse | null> {
    try {
      const { affected } = await this._userRepo.update(user_id, { email });
      return !!affected ? {user_id, email } : null;
    } catch(err) {
      throw err;
    }
  }

  async findExistenceForUpdate(user_id: number): Promise<boolean> {
    try {
      return !!await this._userRepo.findOne({where: {user_id}});
    } catch(err) {
      throw err;
    }
  }

  async doesUserExist(email: string, dob: Date): Promise<boolean> {
    try {
      return !!await this._userRepo.findOne({where: {email, dob}});
    } catch(err) {
      throw err;
    }
  }

  async getFirstUserWhere(userDataFilters: UsersWhereFilter): Promise<User> {
    try {
      const results = await this._userRepo.findOneBy(userDataFilters);
      return results;
    } catch(err) {
      throw err;
    }
  }
}