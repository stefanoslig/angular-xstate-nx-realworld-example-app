import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { AuthMachineServiceObject } from './state-machine-object.config';
import { Subject } from 'rxjs';
import { links, nodes } from '../data';
import * as shape from 'd3-shape';

@Component({
  selector: 'app-state-machine-object',
  templateUrl: './state-machine-object.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StateMachineObjectComponent implements OnInit, OnDestroy {
  links = links.anauthorized;
  nodes = nodes.anauthorized;
  curve = shape.curveBundle.beta(1);
  update$ = new Subject();

  constructor(private authMachineService: AuthMachineServiceObject) {}

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
