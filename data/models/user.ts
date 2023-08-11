import { User } from ".";

export type NewUser = Omit<User, 'user_id' | 'profile'>;
export type UsersWhereFilter = Partial<Pick<User, 'email' | 'first_name' | 'last_name' | 'user_name' | 'dob'>>;
export type NewUserResponse = Omit<User, 'password' | 'is_registered' | 'profile' >;
export type UserUpdatedResponse = Pick<User, 'user_id'> & Partial<Omit<User, 'profile' | 'password' | 'is_registered'>>;
