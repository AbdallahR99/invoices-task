import { Injectable, OnDestroy } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { Subject } from 'rxjs/internal/Subject';
import { TranslateService } from '@ngx-translate/core';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

@Injectable()
export class MatPaginatorIntlCro extends MatPaginatorIntl
  implements OnDestroy {
  unsubscribe: Subject<void> = new Subject<void>();
  OF_LABEL = 'of';

  constructor(private translate: TranslateService) {
    super();

    this.translate.onLangChange
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => {
        this.getAndInitTranslations();
      });

    this.getAndInitTranslations();
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  getAndInitTranslations() {
    this.translate
      .get([
        'PAGINATOR.ITEMS_PER_PAGE',
        'PAGINATOR.NEXT',
        'PAGINATOR.PREVIOUS',
        'PAGINATOR.OF',
      ])
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(translation => {
        // debugger;
        this.itemsPerPageLabel =
          translation['PAGINATOR.ITEMS_PER_PAGE'];
        this.nextPageLabel = translation['PAGINATOR.NEXT'];
        this.previousPageLabel =
          translation['PAGINATOR.PREVIOUS'];
        this.OF_LABEL = translation['PAGINATOR.OF'];
        this.changes.next();
      });
  }

  override getRangeLabel = (
    page: number,
    pageSize: number,
    length: number,
  ) => {
    if (length === 0 || pageSize === 0) {
      return `0 ${this.OF_LABEL} ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex =
      startIndex < length
        ? Math.min(startIndex + pageSize, length)
        : startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} ${
      this.OF_LABEL
    } ${length}`;
  };
}
