import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { AuthMachineServiceIf } from './state-machine-if.config';
import { links, nodes } from '../data';

@Component({
  selector: 'app-state-machine-if',
  templateUrl: './state-machine-if.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StateMachineIfComponent implements OnInit, OnDestroy {
  links = links.anauthorized;
  nodes = nodes.anauthorized;

  constructor(private authMachineService: AuthMachineServiceIf) {}

  ngOnInit() {
    this.authMachineService.state$.subscribe((state) => {
      if (
        state.previous_value === 'authorized' ||
        state.previous_value === 'signup'
      ) {
        this.nodes = [...nodes[`${state.value}2`]];
        this.links = [...links[`${state.value}2`]];
      } else {
        this.nodes = [...nodes[state.value]];
        this.links = [...links[state.value]];
      }
    });
  }

  onEvent(event: { state: string; type: string }) {
    this.authMachineService.transition(event.state, { type: event.type });
  }

  restart() {
    this.authMachineService.stop();
  }

  ngOnDestroy() {
    this.authMachineService.stop();
  }
}