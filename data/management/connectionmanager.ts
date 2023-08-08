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
      host: process.env.DB_HOSTNAME,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      connectionLimit: 10,
      waitForConnections: true,
      port: +process.env.DB_PORT,
      connectTimeout: 10000,
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
  ssl: {
    ca: process.env.DB_SSLCERT_PEM,
    rejectUnauthorized: true,
  }
};

export const sqlDB = new DataSource(ormDataSourceConfigOptions);