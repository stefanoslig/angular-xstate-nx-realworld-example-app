import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

const isAmatch = (currentValue: string) => (nextValue: string) =>
  currentValue === nextValue;

export interface State<D, E> {
  value: string;
  previous_value: string;
  match: (value: string) => boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthMachineServiceObject {
  unsubscribe$ = new Subject();

  state$ = new BehaviorSubject<State<any, { type: string }>>({
    value: 'unauthorized',
    previous_value: 'init',
    match: isAmatch('unauthorized'),
  });

  authMachine = {
    states: {
      unauthorized: {
        on: { SIGNIN: 'signin', SIGNUP: 'signup' },
      },
      authorized: {
        on: { LOGOUT: 'unauthorized' },
      },
      signin: {
        on: { SIGNIN_SUCCESS: 'authorized', SIGNIN_FAILURE: 'unauthorized' },
      },
      signup: {
        on: { SIGNUP_SUCCESS: 'authorized', SIGNUP_FAILURE: 'unauthorized' },
      },
    },
  };

  transition(state: string, event: { type: string }) {
    const nextState = this.authMachine[state].on[event];
    this.state$.next({
      value: nextState,
      previous_value: state,
      match: isAmatch(nextState),
    });
  }

  stop() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
