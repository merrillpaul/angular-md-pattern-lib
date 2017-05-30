import { Component, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'table[psn-table-body]',
  styleUrls: ['./grid-body.component.scss' ],
  templateUrl: './grid-body.component.html',
})
export class GridBodyComponent {

  constructor(private _elementRef: ElementRef, private _renderer: Renderer2) {
    this._renderer.addClass(this._elementRef.nativeElement, 'psn-data-table');
  }

}
