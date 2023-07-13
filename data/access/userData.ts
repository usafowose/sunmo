import { Pool } from 'mysql2/promise';
import { Repository } from "typeorm";
import { connectionManager1, sqlDB } from "../management";
import { User } from "../models";
import { StandardQueryBuilder } from "../utils/querybuilder";

export class UserAccessLayer {
  private _inbuiltConnection: Pool = connectionManager1.connectionPool;
  private _queryBuilder: StandardQueryBuilder = new StandardQueryBuilder();
  private _profileRepository: Repository<User> = sqlDB.getRepository(User);

  constructor() {

  }

  // METHODS
}