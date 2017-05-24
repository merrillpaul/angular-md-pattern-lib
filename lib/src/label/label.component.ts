import { Component, Input, Renderer2, ElementRef, ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'psn-label',
    templateUrl: './label.component.html',
    styleUrls: ['./label.component.scss']
})
export class LabelComponent {
    constructor(private _renderer: Renderer2,
        private _changeDetectorRef: ChangeDetectorRef,
        private _elementRef: ElementRef) {  
        this._renderer.addClass(this._elementRef.nativeElement, 'psn-label');      
        this.setupColor(this._color);
    }

    @Input('text') text: string = '';


    @Input('hidden') hidden: boolean = false;

    private _color: string = 'primary';

    /**
  * color?: primary | accent | warn
  *
  * Sets the color of the message.
  * Can also use any material color: purple | light-blue, etc.
  */
    @Input('color')
    set color(color: string) {        
        this._color = color;
        this.setupColor(color);
        this._changeDetectorRef.markForCheck();
    }

    get color(): string {
        return this._color;
    }

    /**
     * 
     * @param color Sets up the color theme and also looks for any overrides from common material colors for background and text colors
     */
    private setupColor(color: string) {
        this._renderer.removeClass(this._elementRef.nativeElement, 'mat-' + this._color);
        this._renderer.removeClass(this._elementRef.nativeElement, 'bgc-' + this._color + '-100');
        this._renderer.removeClass(this._elementRef.nativeElement, 'tc-' + this._color + '-700');
        if (color === 'primary' || color === 'accent' || color === 'warn' || color === 'success' || color === 'secondary') {
            this._renderer.addClass(this._elementRef.nativeElement, 'mat-' + color);
        } else {
            this._renderer.addClass(this._elementRef.nativeElement, 'bgc-' + color + '-100');
            this._renderer.addClass(this._elementRef.nativeElement, 'tc-' + color + '-700');
        }
    }

}