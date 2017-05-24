import { Component, Input, Renderer2, ChangeDetectorRef, ElementRef } from '@angular/core';

@Component({
  selector: 'nav-footer,nav-footer-inner',
  styleUrls: ['./nav-footer.component.scss'],
  templateUrl: './nav-footer.component.html'
})
export class NavFooterComponent {

  constructor(private _renderer: Renderer2,
    private _changeDetectorRef: ChangeDetectorRef,
    private _elementRef: ElementRef) {
      this._renderer.addClass(this._elementRef.nativeElement, 'nav-footer');
  }

  private _color: string;

  @Input('color')
  set color(color: string) {
    this._renderer.removeClass(this._elementRef.nativeElement, 'mat-' + this._color);
    this._renderer.removeClass(this._elementRef.nativeElement, 'bgc-' + this._color + '-100');
    this._renderer.removeClass(this._elementRef.nativeElement, 'tc-' + this._color + '-700');
    if (color === 'primary' || color === 'accent' || color === 'warn' || color === 'success' || color === 'secondary') {
      this._renderer.addClass(this._elementRef.nativeElement, 'mat-' + color);
    } else {
      this._renderer.addClass(this._elementRef.nativeElement, 'bgc-' + color + '-100');
      this._renderer.addClass(this._elementRef.nativeElement, 'tc-' + color + '-700');
    }
    this._color = color;
    this._changeDetectorRef.markForCheck();
  }
  get color(): string {
    return this._color;
  }
}
