import { UserAccessLayer } from "../data/access/userData";
import { User } from "../data/models/orm-entities/userentity";
import { CreateUserInput } from "../data/models/profile";

export class UserService {
  private _userAccessLayer: UserAccessLayer;

  constructor() {
    this._userAccessLayer = new UserAccessLayer();
  }

  async getUserById(id: string): Promise<User | null> {
    try {
      const user: User = await this._userAccessLayer.getUserById(id);
      return user || null;
    } catch (err) {
      console.error(String(err));
    }
  }

  async getAllActiveUsers(): Promise<User[]> {
    try {
      const allUsers: User[] = await this._userAccessLayer.getAllActiveUsers();
      return allUsers;
    } catch(err){
      console.error(String(err));
      throw err;
    }
  }

  async createUnregisteredUser(user: CreateUserInput): Promise<User> {
    const unregisteredUserObj: CreateUserInput & Pick<User, 'is_registered'> = { ...user, is_registered: false }
    try {
      const createdUser = await this._userAccessLayer.createUnregisteredUser(unregisteredUserObj);
      return createdUser;
    } catch (err) {
      throw err;
    }
  }
  
}