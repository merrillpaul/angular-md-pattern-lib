import { Component, Renderer2, ElementRef, Inject, AfterViewInit, AfterContentInit, Input } from '@angular/core';

@Component({
    selector: 'div[psn-table-body]',
    styleUrls: ['./grid-body.component.scss'],
    templateUrl: './grid-body.component.html',
})
export class GridBodyComponent implements AfterViewInit, AfterContentInit {

    constructor(private _elementRef: ElementRef, private _renderer: Renderer2
    ) {

    }

    private _iscroll: IScroll;     
   
    /**
     * Can be px, rem, em, vh etc
     * Setting a grid height gets a scroll with locked column headers
     */
    private _gridHeight: string;

    @Input('gridHeight')
    set gridHeight(height: string) {
        this._gridHeight = height;
        this.setIfHeight();
    }

    get gridHeight(): string {
        return this._gridHeight;
    }


    private setIfHeight(): void {
        if (this._gridHeight) {
            this._renderer.addClass(this._elementRef.nativeElement, 'has-height');
            this._renderer.setStyle(this._elementRef.nativeElement, 'height', this._gridHeight);
        }
    }

    private setupScrollbars(): void {
        if (this._gridHeight) {
            this._iscroll = new IScroll(this._elementRef.nativeElement, {
                scrollbars: true,
                mouseWheel: true,
                interactiveScrollbars: true,
                shrinkScrollbars: 'scale',
                fadeScrollbars: true
            });
        }
    }

    ngAfterContentInit(): void {
        this.setIfHeight();
    }

    ngAfterViewInit(): void {
        this.setupScrollbars();
    }
}
