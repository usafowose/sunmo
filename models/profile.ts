export interface Profile {
  profileId: string;
  familyId: string;
  user: User;
  userName?: string;
  displayName?: string;
  profileIcon?: string;
  metadata?: ProfileData;
}

export type NewProfile = Pick<Profile, 'familyId' | 'user' | 'metadata'>;

export interface ProfileData {
  createdAt?: Date;
  source?: ProfileSource;
  // last seen
  // last updated
}

export interface User {
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

export enum ProfileSource {
  INVITED = 'INVITED',
  MANUAL = 'MANUAL',
}
