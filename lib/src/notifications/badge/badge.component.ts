import { Component, Input, HostBinding, ChangeDetectionStrategy,
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

   constructor(private _renderer: Renderer2,
              private _elementRef: ElementRef) {
    this._renderer.addClass(this._elementRef.nativeElement, 'psn-badge');
  }

 
  @ViewChild('content') content: ElementRef;

 
  @Input() color: 'primary' | 'accent' | 'success' | 'secondary' | 'warn' = 'primary';


  @Input()
  set x(positionX: BadgeHorizontalPosition) {
    this._positionX = positionX;
  }
  get x(): BadgeHorizontalPosition {
    return this._positionX;
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
