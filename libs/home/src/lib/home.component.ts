import { Component, ChangeDetectionStrategy } from '@angular/core';
import { HomeMachineFacade } from './+xstate/home-machine.facade';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  activeTabFeed$ = this.homeMachineFacade.activeTabFeed$;
  activeTabAll$ = this.homeMachineFacade.activeTabAll$;
  activeTabTag$ = this.homeMachineFacade.activeTabTag$;
  activeTagName$ = this.homeMachineFacade.activeTagName$;
  tags$ = this.homeMachineFacade.tags$;

  constructor(private homeMachineFacade: HomeMachineFacade) {}

  activateFeedTab() {
    this.homeMachineFacade.activateFeedTab();
  }
  activateAllTab() {
    this.homeMachineFacade.activateAllTab();
  }
  activateTagTab(tag: string) {
    this.homeMachineFacade.activateTagTab(tag);
  }
}
