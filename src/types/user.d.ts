export type UserType = 'super-admin' | 'admin' | 'client';


export interface User {
  id: string;
  name?: string;
  avatar?: string;
  email?: string;
  typeOfUser?: UserType;

  [key: string]: unknown;
}
