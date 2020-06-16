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

  authMachine(state: string, event: { type: string }): string {
    if (state === 'unauthorized') {
      if (event.type === 'SIGNIN') {
        return 'signin';
      }
      if (event.type === 'SIGNUP') {
        return 'signup';
      }
    } else if (state === 'authorized') {
      if (event.type === 'LOGOUT') {
        return 'unauthorized';
      }
    } else if (state === 'signin') {
      if (event.type === 'SIGNIN_SUCCESS') {
        return 'authorized';
      }
      if (event.type === 'SIGNIN_FAILURE') {
        return 'unauthorized';
      }
    } else if (state === 'signup') {
      if (event.type === 'SIGNUP_SUCCESS') {
        return 'authorized';
      }
      if (event.type === 'SIGNUP_FAILURE') {
        return 'unauthorized';
      }
    }
  }

  transition(state: string, event: { type: string }) {
    const nextState = this.authMachine(state, event);
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
