import { User } from '@angular-xstate-nx-realworld-example-app/shared';

export interface AuthMachineSchema {
  states: {
    authorized: {};
    unauthorized: {};
    signin: {};
    signup: {};
    updating: {};
  };
}

export interface AuthMachineContext {
  user: User;
  errors: string[];
}
