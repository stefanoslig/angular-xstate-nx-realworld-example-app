import { Injectable } from '@angular/core';
import { AuthMachineService } from './auth-machine.config';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from '@angular-xstate-nx-realworld-example-app/shared';
import { Logout } from './auth-machine.events';

@Injectable({ providedIn: 'root' })
export class AuthMachineFacade {
  private state$ = this.authMachineService.authMachine.state$;
  send = this.authMachineService.authMachine.send;

  isSignIn$: Observable<boolean> = this.state$.pipe(
    map((state) => state.matches('signin'))
  );
  isSignUp$: Observable<boolean> = this.state$.pipe(
    map((state) => state.matches('signup'))
  );
  isAnauthorized$: Observable<boolean> = this.state$.pipe(
    map((state) => state.matches('unauthorized'))
  );
  isAauthorized$: Observable<boolean> = this.state$.pipe(
    map((state) => state.matches('authorized'))
  );
  errors$: Observable<string[]> = this.state$.pipe(
    map((state) => state.context.errors)
  );
  user$: Observable<User> = this.state$.pipe(
    map((state) => state.context.user)
  );

  constructor(private authMachineService: AuthMachineService) {}

  logout() {
    this.send(new Logout());
  }
}
