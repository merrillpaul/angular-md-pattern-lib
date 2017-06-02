import { Component, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'div[psn-table-header]',
  styleUrls: ['./grid-header.component.scss' ],
  templateUrl: './grid-header.component.html',
})
export class GridHeaderComponent {

  constructor(private _elementRef: ElementRef, private _renderer: Renderer2) {
   
  }

}
