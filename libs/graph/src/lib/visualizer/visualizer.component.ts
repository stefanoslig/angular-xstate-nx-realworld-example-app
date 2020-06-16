import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { Subject } from 'rxjs';
import * as shape from 'd3-shape';
import { Edge, Node } from '@swimlane/ngx-graph';

@Component({
  selector: 'app-visualizer',
  templateUrl: './visualizer.component.html',
  styleUrls: ['./visualizer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VisualizerComponent {
  @Input() links: Edge[];
  @Input() nodes: Node[];
  @Output() event = new EventEmitter<{ state: string; type: string }>();
  curve = shape.curveBundle.beta(1);
  update$ = new Subject();

  signIn() {
    this.event.emit({ state: 'unauthorized', type: 'SIGNIN' });
  }

  signUp() {
    this.event.emit({ state: 'unauthorized', type: 'SIGNUP' });
  }

  signInSuccess() {
    this.event.emit({ state: 'signin', type: 'SIGNIN_SUCCESS' });
  }

  signUpSuccess() {
    this.event.emit({ state: 'signup', type: 'SIGNUP_SUCCESS' });
  }

  logout() {
    this.event.emit({ state: 'authorized', type: 'LOGOUT' });
  }
}
