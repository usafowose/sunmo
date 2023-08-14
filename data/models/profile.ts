import { User } from "./orm-entities/userentity";

export interface Profile {
  profileId: string;
  user: User;
  userName?: string;
  displayName?: string;
  profileIcon?: string;
  metadata?: ProfileData;
}

export interface ProfileData {
  createdAt?: Date;
  source?: RegistrationSource;
  lastUpdated: Date;
  lastSeen: Date;
}

export interface RawUser {
  firstName: string;
  surname: string;
  birthday: Date;
  contact: UserContact;
}

export interface UserContact {
  email: string;
  number?: string;
  city?: string;
  country?: string;
}

export interface ProfileResult {
  id: number;
  user_id: number;
  first_name: string;
  last_name: string;
  birthday: Date;
  email:string;
  [key: string]: any;  // eslint-disable-line @typescript-eslint/no-explicit-any
}

export enum RegistrationSource {
  Invitation = 0,
  SelfRegistration = 1
}

export type CreateUserInput = Pick<User, "email" | "first_name" | "last_name"> & Partial<Pick<User, 'dob'>>
