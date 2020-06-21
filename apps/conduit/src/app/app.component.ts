import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthMachineFacade } from '@angular-xstate-nx-realworld-example-app/auth';

@Component({
  selector: 'conduit-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  isAauthorized$ = this.authMachineFacade.isAauthorized$;
  user$ = this.authMachineFacade.user$;
  constructor(private authMachineFacade: AuthMachineFacade) {}

  logout() {
    this.authMachineFacade.logout();
  }
}
