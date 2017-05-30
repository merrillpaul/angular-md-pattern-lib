import { Component, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'tr[psn-data-row]',
  styleUrls: ['./grid-row.component.scss' ],
  templateUrl: './grid-row.component.html',
})
export class GridRowComponent {

  constructor(private _elementRef: ElementRef, private _renderer: Renderer2) {
    this._renderer.addClass(this._elementRef.nativeElement, 'psn-data-row');
  }
  
  focus(): void {
    this._elementRef.nativeElement.focus();
  }

}
