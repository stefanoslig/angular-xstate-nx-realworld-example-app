import { User } from '@angular-xstate-nx-realworld-example-app/shared';

export interface AuthContext {
  user: User;
  errors: string[];
}

export interface Errors {
  [key: string]: string;
}
