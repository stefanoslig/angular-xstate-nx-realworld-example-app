import { Article } from '@angular-xstate-nx-realworld-example-app/shared';
import { ArticleListConfig } from '../article-list.models';

export interface ArticleListMachineSchema {
  states: {
    idle: {};
    loading: {};
    favoriting: {};
    unfavoriting: {};
    success: {};
    fail: {};
  };
}

export interface ArticleListMachineContext {
  articles: Article[];
  config: ArticleListConfig;
}
