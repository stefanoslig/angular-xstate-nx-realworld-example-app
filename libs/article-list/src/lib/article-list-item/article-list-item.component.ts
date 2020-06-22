import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Article } from '@angular-xstate-nx-realworld-example-app/shared';

@Component({
  selector: 'app-article-list-item',
  templateUrl: './article-list-item.component.html',
  styleUrls: ['./article-list-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleListItemComponent {
  @Input() article: Article;
  @Output() favorite: EventEmitter<string> = new EventEmitter();
  @Output() unFavorite: EventEmitter<string> = new EventEmitter();

  toggleFavorite(article: Article) {
    if (article.favorited) {
      this.unFavorite.emit(article.slug);
    } else {
      this.favorite.emit(article.slug);
    }
  }
}
