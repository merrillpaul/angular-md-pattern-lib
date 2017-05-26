import { Component } from '@angular/core';

import { PageChangeEvent, MediaQueryService } from '@pearson/angular-material';
@Component({
    selector: 'paging-example',
    templateUrl: './paging.example.component.html'
})

export class PagingBarExampleComponent {
    ////// Paginates
  paginateEvent: PageChangeEvent;
  firstLast: boolean = false;

  constructor(public media: MediaQueryService) {}


  paginate(event: PageChangeEvent): void {
    this.paginateEvent = event;
  }

  togglePaginateFirstLast(): void {
    this.firstLast = !this.firstLast;
  }


  fileSelectMsg: string = 'No file selected yet.';
  fileUploadMsg: string = 'No file uploaded yet.';
  disabled: boolean = false;

}