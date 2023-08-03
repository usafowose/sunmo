import { User } from ".";

export type UserFilterInput = Partial<Pick<User, 'email' | 'first_name' | 'last_name' | 'user_name'>>;
