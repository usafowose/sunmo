/* eslint-disable no-useless-catch */
import { UserAccessLayer } from "../data/access/userData";
import { User } from "../data/models/orm-entities/userentity";
import { CreateUserInput } from "../data/models/profile";
import { NewUser, NewUserResponse, UsersWhereFilter, UserUpdatedResponse } from "../data/models/user";
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
      return allUsers;
    } catch(err) {
      throw err;
    }
  }

  async getUsersWhere(filters: Map<UserKey, any>): Promise<User[]> {// eslint-disable-line @typescript-eslint/no-explicit-any
    const filterObj: UsersWhereFilter = Object.fromEntries(filters.entries());
    try {
      const results: User[] = await this._userAccessLayer.getUsersWhere(filterObj);
      return results;
    } catch(err) {
      throw err;
    }
  }

  async updateUserEmail(user_id: number, newEmail: string): Promise<UserUpdatedResponse> {
    try {
      const result = await this._userAccessLayer.updateEmail(user_id, newEmail);
      if (result) return result;
      throw new Error('something happened on update. No update, no throw');
    } catch (err) {
      console.log(err.raw);
      throw err;
    }
  }

  async getAllPendingUsers(): Promise<User[]> {
    try {
      const unregisteredUsers = await this._userAccessLayer.getUnregisteredUsers();
      return unregisteredUsers;
    } catch(err) {
      throw err;
    }
  }

  async createNewRegisteredUser(user: NewUser): Promise<NewUserResponse> {
    try {
      const registeredUser: NewUser = { ...user, is_registered: true };
      const newUserData: NewUserResponse = await this._userAccessLayer.createRegisteredUser(registeredUser);
      return newUserData;
    } catch(err) {
      throw err;
    }
  }

  async findExistenceForUpdate(user_id: string): Promise<boolean> {
    try {
      const userExists = await this._userAccessLayer.findExistenceForUpdate(+user_id);
      return userExists;
    } catch (err) {
      throw err;
    }
  }

  async doesUserExist(email: string, dob: Date): Promise<boolean> {
    try {
      const match =  !!await this._userAccessLayer.doesUserExist(email, dob);
      return match;
    } catch(err) {
      throw err;
    }
  }

  async isEmailTaken(email: string): Promise<boolean> {
    try {
      const emailTaken = !!await this._userAccessLayer.getFirstUserWhere({email});
      return emailTaken ? true : false;
    } catch(err) {
      throw err;
    }
  }
}
