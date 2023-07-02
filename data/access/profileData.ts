import mysql, {Connection, ConnectionOptions, Pool, PoolConnection} from 'mysql2/promise';
import { ProfileResult } from '../../models/profile';
import { ConnectionManager } from '../management';
import { FilterMap, filterOperator, Operator } from '../utils/filtermap';
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

  async getProfileById(profileId: string): Promise<string> {
    const filter: FilterMap = new Map<string, Operator>();
    filter.set( 'profile_id', Operator.EQUALTO );



    let queryResult: ProfileResult;
    const query = this._queryBuilder.getQuery(Method.Get, 'profiles', undefined, filter)
 
    try {
      const [results, _fields] = await this._connectionPool.execute(query, [ profileId ]);
      console.log(results);
      return 'hello';
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

}