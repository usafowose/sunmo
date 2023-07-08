import {Connection, ConnectionOptions, Pool, PoolConnection} from 'mysql2/promise';
import { ProfileResult } from '../models/profile';
import { ConnectionManager } from '../management';
import { FilterMap, operatorSymbolMap, Operator } from './models';
import { Method, StandardQueryBuilder } from '../utils/querybuilder';

export class ProfileAccessLayer {
  private _connectionManager: ConnectionManager;
  private _connectionPool: Pool;
  private _queryBuilder: StandardQueryBuilder;

    constructor(connectionManager: ConnectionManager ) {
      this._connectionManager = connectionManager;
      this._connectionPool = this._connectionManager.getConnectionPool();
      this._queryBuilder = new StandardQueryBuilder();
    }
// TODO (afowose): in each of these handler calls (handler calls these) work with sqlDB.repository (repo)
  async getProfileById(profileId: string): Promise<string> {
    const { _queryBuilder: queryBuilder, _connectionPool: connectionPool } = this;
    const filter: FilterMap = new Map<string, Operator>([
      ['profile_id', Operator.EQUALTO]
    ]);

    const query = queryBuilder.getQuery(Method.Get, 'profiles', filter);
 
    try {
      const [results, _fields] = await connectionPool.execute(query, [ profileId ]);
      console.log(results);
      return 'hello';
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

}