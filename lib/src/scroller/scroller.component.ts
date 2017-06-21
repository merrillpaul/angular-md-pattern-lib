import { ElementRef, Renderer2, AfterContentInit, AfterViewInit, OnDestroy, Input, Component, HostListener } from '@angular/core';


@Component({
    selector: '[psn-scroller]',
    templateUrl: './scroller.component.html',
    styleUrls: [
        './scroller.component.scss'
    ]

})
export class PearsonScrollerComponent implements AfterContentInit, AfterViewInit, OnDestroy {



    private _containerHeight: string;
    private _iscroll: IScroll;
    private _browserScroll: boolean = false;
    private _previousBrowserScrollState: boolean = false;
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

    @Input('browserScroll')
    set userBrowserScroller(useBrowser: boolean) {
        if (this._previousBrowserScrollState !== useBrowser) {
            this._browserScroll = useBrowser;
            this._toggleScrollHandling();
            this._previousBrowserScrollState = useBrowser;
        }
    }

    get browserScroll(): boolean {
        return this._browserScroll;
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        if (this._browserScroll === false) {
            this.setIfHeight();
        }
        this.onRefresh();
    }

    private _toggleScrollHandling() {
        if (this._iscroll) {
            this._iscroll.destroy();
        }

        if (this._browserScroll === false) {
            this.setIfHeight();
            this.setupScrollbars();
            this._renderer.removeClass(this._elementRef.nativeElement, 'browserScroll');
        } else {
            this._renderer.removeStyle(this._elementRef.nativeElement, 'height');
             this._renderer.addClass(this._elementRef.nativeElement, 'browserScroll');
        }

       
    }

    private setIfHeight(): void {
        if (this._containerHeight) {
            this._renderer.setStyle(this._elementRef.nativeElement, 'height', this._containerHeight);
        } else {
            let parent = this._elementRef.nativeElement.parentElement;
            this._renderer.setStyle(this._elementRef.nativeElement, 'height', `${parent.offsetHeight}px`);
        }
    }

    private setupScrollbars(): void {

        this._iscroll = new IScroll(this._elementRef.nativeElement, {
            scrollbars: true,
            mouseWheel: true,
            interactiveScrollbars: true,
            shrinkScrollbars: 'scale',
            fadeScrollbars: true
        });

    }

    private onRefresh(): void {
        if (this._iscroll) {
            //console.log('iscroll refreshing');
            setTimeout(() => this._iscroll.refresh(), 1);
        }
    }

    ngAfterContentInit(): void {
        if (this._browserScroll === false) {
            this.setIfHeight();
        }
    }

    ngAfterViewInit(): void {
        if (this._browserScroll === false) {
            this.setupScrollbars();
        }
        setTimeout(() => {
            this.onResize(null);
        }, 1000);
    }

    ngOnDestroy(): void {
        this._iscroll && this._iscroll.destroy();
    }

    public refreshScroll(): void {
        this.onRefresh();
    }
}