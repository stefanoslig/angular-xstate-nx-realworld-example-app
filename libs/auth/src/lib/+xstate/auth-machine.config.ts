import { Injectable } from '@angular/core';
import { Machine, assign } from 'xstate';
import { useMachine } from '@angular-xstate-nx-realworld-example-app/xstate-angular';
import { environment } from '@env/environment';
import { AuthMachineContext, AuthMachineSchema } from './auth-machine.schema';
import {
  AuthMachineEvent,
  SignInSuccess,
  SignInFail,
  SignUpSuccess,
  SignUpFail,
  SignIn,
  SignUp,
} from './auth-machine.events';
import { AuthService } from '../auth.service';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';

export const initialContext: AuthMachineContext = {
  user: {
    email: '',
    token: '',
    username: '',
    bio: '',
    image: '',
  },
  errors: [],
};

@Injectable({ providedIn: 'root' })
export class AuthMachineService {
  constructor(
    private readonly authService: AuthService,
    private router: Router
  ) {}

  private ɵauthMachine = Machine<
    AuthMachineContext,
    AuthMachineSchema,
    AuthMachineEvent
  >(
    {
      id: 'auth',
      initial: 'unauthorized',
      context: initialContext,
      states: {
        unauthorized: {
          entry: 'resetUser',
          on: {
            SIGNIN: 'signin',
            SIGNUP: 'signup',
          },
        },
        signin: {
          entry: 'resetErrors',
          invoke: { src: 'signIn' },
          on: {
            SIGNIN_SUCCESS: { target: 'authorized', actions: 'assignUser' },
            SIGNIN_FAILURE: { target: 'unauthorized', actions: 'assignErrors' },
          },
        },
        signup: {
          entry: 'resetErrors',
          invoke: { src: 'signUp' },
          on: {
            SIGNUP_SUCCESS: { target: 'authorized', actions: 'assignUser' },
            SIGNUP_FAILURE: { target: 'unauthorized', actions: 'assignErrors' },
          },
        },
        authorized: {
          entry: ['goToHomePage', 'assignUser'],
          on: {
            UPDATE_USER: 'updating',
            LOGOUT: 'logout',
          },
        },
        updating: {},
        logout: {},
      },
    },
    {
      actions: {
        resetUser: assign<AuthMachineContext, SignInSuccess>(() => ({
          user: initialContext.user,
        })),
        resetErrors: assign<AuthMachineContext, SignInSuccess>(() => ({
          errors: initialContext.errors,
        })),
        goToHomePage: (ctx: AuthMachineContext, event: AuthMachineEvent) =>
          this.router.navigateByUrl(''),
        assignUser: assign<AuthMachineContext, SignInSuccess>((ctx, event) => ({
          user: event.response.user,
        })),
        assignErrors: assign<AuthMachineContext, SignInFail>((_, event) => ({
          errors: Object.keys(event.errors || {}).map(
            (key) => `${key} ${event.errors[key]}`
          ),
        })),
      },
      services: {
        signIn: (_, event: SignIn) =>
          this.authService
            .login({ email: event.username, password: event.password })
            .pipe(
              map((user) => new SignInSuccess(user)),
              catchError((result) => of(new SignInFail(result.error.errors)))
            ),
        signUp: (_, event: SignUp) =>
          this.authService
            .register({
              username: event.username,
              email: event.email,
              password: event.password,
            })
            .pipe(
              map((user) => new SignUpSuccess(user)),
              catchError((result) => of(new SignUpFail(result.error.errors)))
            ),
      },
    }
  );

  authMachine = useMachine(this.ɵauthMachine, {
    devTools: !environment.production,
  });
}
