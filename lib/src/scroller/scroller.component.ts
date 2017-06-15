import { ElementRef, Renderer2, AfterContentInit, AfterViewInit, Input, Component } from '@angular/core';


@Component({ 
    selector: '[psn-scroller]' ,
    templateUrl: './scroller.component.html',
    styleUrls: [
        './scroller.component.scss'
    ]
    
})
export class PearsonScrollerComponent implements AfterContentInit, AfterViewInit {

    private _containerHeight: string = '200px';
    private _iscroll: IScroll;
    constructor(private _elementRef: ElementRef, private _renderer: Renderer2) {
        
    }

    @Input('containerHeight')
    set gridHeight(height: string) {
        this._containerHeight = height;
        this.setIfHeight();
    }

    get gridHeight(): string {
        return this._containerHeight;
    }


    private setIfHeight(): void {
        if (this._containerHeight) {           
            this._renderer.setStyle(this._elementRef.nativeElement, 'height', this._containerHeight);
        }
    }

    private setupScrollbars(): void {
        if (this._containerHeight) {
            this._iscroll = new IScroll(this._elementRef.nativeElement, {
                scrollbars: true,
                mouseWheel: true,
                interactiveScrollbars: true,
                shrinkScrollbars: 'scale',
                fadeScrollbars: true
            });

        }
    }

    private onRefresh(): void {
        if (this._iscroll) {
            //console.log('iscroll refreshing');
            setTimeout(() => this._iscroll.refresh(), 1);
        }
    }

    ngAfterContentInit(): void {
        this.setIfHeight();
    }

    ngAfterViewInit(): void {
        this.setupScrollbars();        
    }

    public refreshScroll(): void {
        this.onRefresh();
    }
}