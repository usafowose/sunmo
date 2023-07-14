import { Pool } from 'mysql2/promise';
import { Repository } from "typeorm";

import { connectionManager1, sqlDB } from "../management";
import { User } from "../models";
import { CreateUserInput } from '../models/profile';
import { StandardQueryBuilder } from "../utils/querybuilder";

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

  async getUserById(id: string): Promise<User | null> {
    try {
      const user = this._userRepo.findOneBy({ user_id: Number(id)} );
      return user || null;
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

}