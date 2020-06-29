import { Injectable } from '@angular/core';
import { ArticleListMachineService } from './article-list-machine.config';
import { GetArticles } from './article-list-machine.events';
import { Article } from '@angular-xstate-nx-realworld-example-app/shared';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ArticleListMachineFacade {
  private state$ = this.articleListMachineService.articleListMachine.state$;
  send = this.articleListMachineService.articleListMachine.send;
  articles$: Observable<Article[]> = this.state$.pipe(
    map((state) => state.context.articles)
  );
  constructor(private articleListMachineService: ArticleListMachineService) {}

  loadArticles(tabType: string, tag: string) {
    this.send(new GetArticles({ tabType, tag }));
  }
  favorite(slug: string) {}
  unFavorite(slug: string) {}
  setPage(page: number) {}
}
