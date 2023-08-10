import { User } from ".";

export type UserFilterInput = Partial<Pick<User, 'email' | 'first_name' | 'last_name' | 'user_name' | 'dob'>>;

export type NewUser = Omit<User, 'user_id' | 'profile'>;
export type NewUserResponse = Omit<User, 'password' | 'is_registered' | 'profile' >;

