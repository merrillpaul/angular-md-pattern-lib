import { Component, Input, Renderer2, ChangeDetectorRef, ElementRef } from '@angular/core';

@Component({
  selector: 'nav-toolbar-content',
  styleUrls: ['./nav-toolbar.component.scss'],
  templateUrl: './nav-toolbar.component.html'
})
export class NavToolbarContentComponent {

  constructor(private _renderer: Renderer2,
    private _changeDetectorRef: ChangeDetectorRef,
    private _elementRef: ElementRef) {
      this._renderer.addClass(this._elementRef.nativeElement, 'nav-toolbar-content');
  }
  
}