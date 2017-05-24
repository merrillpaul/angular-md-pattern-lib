import { Directive, ElementRef, Renderer2 } from '@angular/core';


@Directive({ selector: '[inverted]' })
export class LabelInvertedDirective {

     constructor(private el: ElementRef, private _renderer: Renderer2) {
         this._renderer.addClass(this.el.nativeElement, 'inverted');  
    }
}