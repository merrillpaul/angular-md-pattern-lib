import { ElementRef, Renderer2, AfterContentInit, AfterViewInit, OnDestroy, Input, Component, HostListener } from '@angular/core';


@Component({ 
    selector: '[psn-scroller]' ,
    templateUrl: './scroller.component.html',
    styleUrls: [
        './scroller.component.scss'
    ]
    
})
export class PearsonScrollerComponent implements AfterContentInit, AfterViewInit , OnDestroy{
    


    private _containerHeight: string;
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

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.setIfHeight();
        this.onRefresh();
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
            this.setIfHeight();        
    }   

    ngAfterViewInit(): void {
        this.setupScrollbars(); 
        setTimeout( () => {
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