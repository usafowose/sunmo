import { UserAccessLayer } from "../data/access/userData";
import { User } from "../data/models/orm-entities/userentity";
import { CreateUserInput } from "../data/models/profile";
import { UserFilterInput } from "../data/models/user";
import { UserKey } from "../routes/handlers";


export class UserService {
  private _userAccessLayer: UserAccessLayer;

  constructor() {
    this._userAccessLayer = new UserAccessLayer();
  }

  async getUserById(id: string): Promise<User[]> {
    try {
      const user: User[] = await this._userAccessLayer.getUserById(id);
      return user;
    } catch (err) {
      throw err;
    }
  }

  async getAllActiveUsers(): Promise<User[]> {
    try {
      const allUsers: User[] = await this._userAccessLayer.getAllActiveUsers();
      return allUsers;
    } catch(err){
      throw err;
    }
  }

  async createPendingUser(user: CreateUserInput): Promise<User> {
    const unregisteredUserObj: CreateUserInput & Pick<User, 'is_registered'> = {
      ...user,
      is_registered: false 
    };

    try {
      const createdUser = await this._userAccessLayer.createUnregisteredUser(unregisteredUserObj);
      return createdUser;
    } catch (err) {
      throw err;
    }
  }

  async getAllPendingAndActiveUsers(): Promise<User[]> {
    try {
      const allUsers: User[] = await this._userAccessLayer.getAllUsers();
      return allUsers
    } catch(err) {
      throw err;
    }
  }

  async getUsersWhere(filters: Map<UserKey, any>): Promise<User[]> {
    const filterObj: UserFilterInput = Object.fromEntries(filters.entries());
    try {
      const results: User[] = await this._userAccessLayer.getUsersWhere(filterObj);
      return results;
    } catch(err) {
      throw err;
    }
  }

  // async changeUserEmail(userId: string, newEmail: string): Promise< void> {
  //   try {
  //     await this._userAccessLayer.updateEmail(userId, newEmail);
  //   } catch (err) {
  //     throw err;
  //   }
  // }

  async getAllPendingUsers(): Promise<User[]> {
    try {
      let unregisteredUsers = await this._userAccessLayer.getUnregisteredUsers();
      return unregisteredUsers;
    } catch(err) {
      throw err;
    }
  }

}