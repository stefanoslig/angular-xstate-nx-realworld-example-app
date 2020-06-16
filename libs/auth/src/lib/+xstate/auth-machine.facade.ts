import { Injectable } from '@angular/core';
import { AuthMachineService } from './auth-machine.config';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
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
  errors$: Observable<string[]> = this.state$.pipe(
    map((state) => state.context.errors)
  );

  constructor(private authMachineService: AuthMachineService) {}
}
