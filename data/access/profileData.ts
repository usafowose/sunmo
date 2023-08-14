import { Pool } from 'mysql2/promise';
import { Repository } from 'typeorm';

import { FilterMap, Operator } from '../../utils/operatorsymbolmap';
import { Method, StandardQueryBuilder } from '../../utils/querybuilder';
import { sqlDB, connectionManager1 } from '../management';
import { Profile } from '../models/orm-entities/profileentity';

export class ProfileAccessLayer {
  private _inbuiltConnection: Pool = connectionManager1.connectionPool;
  private _queryBuilder: StandardQueryBuilder = new StandardQueryBuilder();
  private _profileRepository: Repository<Profile> = sqlDB.getRepository(Profile);

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

// TODO (afowose): in each of these handler calls (handler calls these) work with sqlDB.repository (repo)
  async getProfileById(profileId: string): Promise<Profile> {
    const { _queryBuilder: queryBuilder, _inbuiltConnection: connectionPool } = this;
    const filter: FilterMap = new Map<string, Operator>([
      ['profile_id', Operator.EQUALTO]
    ]);

    const query = queryBuilder.getQuery(Method.Get, 'profiles', filter);

    if (query) {
      try {
        const [results, _fields] = await connectionPool.execute(query, [ profileId ]);
        console.log(results);
        // TODO(afowose): Fix return val;
        return null;
      } catch (err) {
        console.error(err);
        throw err;
      }
    } else {
      try {
        const profile : Profile = await this._profileRepository.findOneByOrFail({ profile_id: Number(profileId) });
        return profile;
        // TODO(afowose): Fix return val;
      } catch (err) {
        console.error(err);
        throw err;
      }
    }
  }

  async deleteProfile(profileId: string): Promise<void> {
    try {
      await this._profileRepository.delete({profile_id: Number(profileId)});
    } catch (err) {
      console.error(String(err));
    }
  }

  async getAllProfiles(): Promise<Profile[]> {
    try {
      const allProfiles: Profile[] = await this._profileRepository.find();
      console.log(allProfiles);
      return allProfiles;
    } catch (err) {
      console.error(String(err));
    }
  }

}
