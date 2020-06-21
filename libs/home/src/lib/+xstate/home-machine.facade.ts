import { Injectable } from '@angular/core';
import { HomeMachineService } from './home-machine.config';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  ActivateFeedTab,
  ActivateAllTab,
  ActivateTagTab,
} from './home-machine.events';

@Injectable()
export class HomeMachineFacade {
  private state$ = this.homeMachineService.homeMachine.state$;
  send = this.homeMachineService.homeMachine.send;

  activeTabFeed$: Observable<boolean> = this.state$.pipe(
    map((state) => state.matches('feed'))
  );
  activeTabAll$: Observable<boolean> = this.state$.pipe(
    map((state) => state.matches('all'))
  );
  activeTabTag$: Observable<boolean> = this.state$.pipe(
    map((state) => state.matches('tag'))
  );
  activeTagName$: Observable<string> = this.state$.pipe(
    map((state) => state.context.selectedTag)
  );
  tags$: Observable<string[]> = this.state$.pipe(
    map((state) => state.context.tags)
  );

  constructor(private homeMachineService: HomeMachineService) {}

  activateFeedTab() {
    this.send(new ActivateFeedTab());
  }
  activateAllTab() {
    this.send(new ActivateAllTab());
  }
  activateTagTab(tag: string) {
    this.send(new ActivateTagTab(tag));
  }
}
