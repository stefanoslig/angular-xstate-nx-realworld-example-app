import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StateMachineIfComponent } from './state-machine-if/state-machine-if.component';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { VisualizerComponent } from './visualizer/visualizer.component';
import { StateMachineObjectComponent } from './state-machine-object/state-machine-object.component';

const graphRouting = RouterModule.forChild([
  {
    path: 'state-machine-if',
    component: StateMachineIfComponent,
  },
  {
    path: 'state-machine-object',
    component: StateMachineIfComponent,
  },
]);

@NgModule({
  imports: [CommonModule, graphRouting, NgxGraphModule],
  declarations: [
    StateMachineIfComponent,
    VisualizerComponent,
    StateMachineObjectComponent,
  ],
})
export class GraphModule {}
