import { createPool, PoolOptions, Pool } from "mysql2/promise";
import { DataSource, DataSourceOptions, FileLogger } from "typeorm";
import "reflect-metadata"
import { User } from "../models";
import { Profile } from "../models/orm-entities/profileentity";

class InbuiltConnectionManager {
  private _connectionPool: Pool;

  constructor() {
    this._connectionPool = createPool(this._getConnectionPoolConfig());
  }

  private _getConnectionPoolConfig(): PoolOptions {
    const config: PoolOptions = {
      host: 'localhost',
      user: 'root',
      password: 'Oluwafikayo1!', //TODO (afowose) move to config file or env var
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
  host: 'localhost',
  username: 'root',
  password: 'Oluwafikayo1!',
  database: 'sunmodb',
  port: 3306,
  synchronize: true,
  dropSchema: true,
  logging: true,
  logger: new FileLogger(true, {
    logPath: './data/log.txt'
  }),
  entities: [User, Profile],
  migrations: [],
  subscribers: [],
};

export const sqlDB = new DataSource(ormDataSourceConfigOptions);