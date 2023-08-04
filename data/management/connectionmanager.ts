import { createPool, PoolOptions, Pool } from "mysql2/promise";
import { DataSource, DataSourceOptions, FileLogger } from "typeorm";
import "reflect-metadata"
import { User } from "../models";
import { Profile } from "../models/orm-entities/profileentity";
import * as dotenv from 'dotenv';
dotenv.config();

class InbuiltConnectionManager {
  private _connectionPool: Pool;

  constructor() {
    this._connectionPool = createPool(this._getConnectionPoolConfig());
  }

  private _getConnectionPoolConfig(): PoolOptions {
    const config: PoolOptions = {
      host: 'localhost',
      user: 'root',
      password: process.env.DB_PASSWORD,
      database: 'sunmodb',
      connectionLimit: 10,
      waitForConnections: true,
      port: 3306,
      connectTimeout: 60000,
    };

    return config;
  }

  get connectionPool(): Pool {
    return this._connectionPool;
  }
}

export const connectionManager1: InbuiltConnectionManager = new InbuiltConnectionManager();

const ormDataSourceConfigOptions: DataSourceOptions = {
  type: 'mysql',
  connectorPackage: 'mysql2',
  host: process.env.DB_HOSTNAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: +process.env.DB_PORT,
  synchronize: true,
  dropSchema: true,
  entities: [User, Profile],
  migrations: [],
  subscribers: [],
};

export const sqlDB = new DataSource(ormDataSourceConfigOptions);