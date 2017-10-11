import { Component, Input, HostBinding, ChangeDetectionStrategy, ChangeDetectorRef,
         ViewChild, ElementRef, AfterContentInit, Renderer2 } from '@angular/core';

export enum BadgeVerticalPosition {
  Top = <any>'top',
  Bottom = <any>'bottom',
  Center = <any>'center',
}

export enum BadgeHorizontalPosition {
  Before = <any>'before',
  After = <any>'after',
  Center = <any>'center',
}

@Component({
  selector: 'psn-badge',
  styleUrls: ['./badge.component.scss' ],
  templateUrl: './badge.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgeComponent implements AfterContentInit {

  private _notifications: string = '';
  private _positionY: BadgeVerticalPosition;
  private _positionX: BadgeHorizontalPosition;
  private _size:number = 20;
  

   constructor(private _renderer: Renderer2,          
        private _changeDetectorRef: ChangeDetectorRef,
              private _elementRef: ElementRef) {
    this._renderer.addClass(this._elementRef.nativeElement, 'psn-badge');
    this._renderer.addClass(this._elementRef.nativeElement, 'mat-' + this._size);
    this.setupColor(this._color);
  }

 
  @ViewChild('content') content: ElementRef;
 

  private _color: string = 'primary';

    /**
     * color?: primary | accent | warn
     *
     * Sets the color of the message.
     * Can also use any material color: purple | light-blue | lime, etc.
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
       
         if (color === 'primary' || color === 'accent'
          || color === 'warn' || color === 'success' || color === 'secondary'
           || color === 'lime' || color === 'yellow' || color === 'link') {
            this._color =  'mat-' + color;
        } else {            
            this._color = `bgc-${color} tc-${color}-700`
        }
        
    }


  @Input()
  set x(positionX: BadgeHorizontalPosition) {
    this._positionX = positionX;
  }
  get x(): BadgeHorizontalPosition {
    return this._positionX;
  }

  @Input()
  set size(size: number) {
    this._renderer.removeClass(this._elementRef.nativeElement, 'mat-' + this._size);
    this._renderer.addClass(this._elementRef.nativeElement, 'mat-' + size);
    this._size = size;   
  }  

  
  @Input()
  set y(positionY: BadgeVerticalPosition) {
    this._positionY = positionY;
  }
  get y(): BadgeVerticalPosition {
    return this._positionY;
  }

 
  @Input()
  set notifications(notifications: string) {
    this._notifications = notifications;
  }

  @HostBinding('class.psn-notification-hidden')
  get hideHost(): boolean {
    return !this.show && !this._hasContent();
  }

  
  get notificationsDisplay(): string {    
    return this._notifications.toString();
  }

  /**
   * Shows notification tip only when [notifications] is present
   */
  get show(): boolean {
    return this._notifications != null && this._notifications.trim().length > 0;
  }

 
  ngAfterContentInit(): void {
    if (!this.x) {
      this.x = this._hasContent() ? BadgeHorizontalPosition.After : BadgeHorizontalPosition.Center;
    }
    if (!this.y) {
      this.y = this._hasContent() ? BadgeVerticalPosition.Top : BadgeVerticalPosition.Center;
    }
  }

  
  private _hasContent(): boolean {
    if (this.content) {
      let contentElement: HTMLElement = this.content.nativeElement;
      return contentElement && (contentElement.children.length > 0 || !!contentElement.textContent.trim());
    }
    return false;
  }

}
