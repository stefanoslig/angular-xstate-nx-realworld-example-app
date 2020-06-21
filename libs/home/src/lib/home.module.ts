import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { HomeService } from './home.service';
import { HomeMachineService } from './+xstate/home-machine.config';
import { HomeMachineFacade } from './+xstate/home-machine.facade';
import { TagsListComponent } from './tags-list/tags-list.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: HomeComponent,
      },
    ]),
  ],
  declarations: [HomeComponent, TagsListComponent],
  providers: [HomeService, HomeMachineService, HomeMachineFacade],
})
export class HomeModule {}
