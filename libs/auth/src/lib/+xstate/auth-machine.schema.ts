import { User } from '@angular-xstate-nx-realworld-example-app/shared';

export interface AuthMachineSchema {
  states: {
    authorized: {};
    unauthorized: {};
    signing_in: {};
    signing_up: {};
    errors: {};
    updating: {};
  };
}

export interface AuthMachineContext {
  user: User;
  errors: string[];
}
