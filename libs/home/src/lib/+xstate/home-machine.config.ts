import { Injectable } from '@angular/core';
import { Machine, assign } from 'xstate';
import { useMachine } from '@angular-xstate-nx-realworld-example-app/xstate-angular';
import { environment } from '@env/environment';
import { HomeMachineContext, HomeMachineSchema } from './home-machine.schema';
import {
  HomeMachineEvent,
  IsAnauthorized,
  IsAuthorized,
  GetTagsSuccess,
  GetTagsFailure,
  ActivateTagTab,
} from './home-machine.events';
import { AuthMachineFacade } from '@angular-xstate-nx-realworld-example-app/auth';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { HomeService } from '../home.service';

export const homeInitialContext: HomeMachineContext = {
  tags: [],
  selectedTag: null,
};

@Injectable({ providedIn: 'root' })
export class HomeMachineService {
  constructor(
    private authMachineFacade: AuthMachineFacade,
    private homeService: HomeService
  ) {}

  private ɵhomeMachine = Machine<
    HomeMachineContext,
    HomeMachineSchema,
    HomeMachineEvent
  >(
    {
      id: 'home',
      context: homeInitialContext,
      initial: 'checking',
      invoke: { src: 'getTags' },
      states: {
        checking: {
          invoke: { src: 'isAnauthorized' },
          on: {
            IS_ANAUTHORIZED: { target: 'all' },
            IS_AUTHORIZED: { target: 'feed' },
          },
        },
        all: {},
        feed: {},
        tag: {},
      },
      on: {
        GET_TAGS_SUCCESS: { actions: 'assignTags' },
        ACTIVATE_FEED_TAB: { target: 'checking' },
        ACTIVATE_ALL_TAB: { target: 'all' },
        ACTIVATE_TAG_TAB: { target: 'tag', actions: 'assignTag' },
      },
    },
    {
      services: {
        isAnauthorized: () =>
          this.authMachineFacade.isAnauthorized$.pipe(
            map((anauthorized) =>
              anauthorized ? new IsAnauthorized() : new IsAuthorized()
            )
          ),
        getTags: () =>
          this.homeService.getTags().pipe(
            map((result) => new GetTagsSuccess(result.tags)),
            catchError((result) => of(new GetTagsFailure(result)))
          ),
      },
      actions: {
        assignTags: assign((_, event: HomeMachineEvent) => ({
          tags: (event as GetTagsSuccess).tags,
        })),
        assignTag: assign((_, event: HomeMachineEvent) => ({
          selectedTag: (event as ActivateTagTab).tag,
        })),
      },
    }
  );

  homeMachine = useMachine(this.ɵhomeMachine, {
    devTools: !environment.production,
  });
}
