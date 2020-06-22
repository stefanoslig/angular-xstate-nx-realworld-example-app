import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { HomeService } from './home.service';
import { HomeMachineService } from './+xstate/home-machine.config';
import { HomeMachineFacade } from './+xstate/home-machine.facade';
import { TagsListComponent } from './tags-list/tags-list.component';
import { ArticleListModule } from '@angular-xstate-nx-realworld-example-app/article-list';

@NgModule({
  imports: [
    CommonModule,
    ArticleListModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: HomeComponent,
      },
    ]),
  ],
  declarations: [HomeComponent, TagsListComponent],
  providers: [HomeService, HomeMachineService, HomeMachineFacade, HomeService],
})
export class HomeModule {}
