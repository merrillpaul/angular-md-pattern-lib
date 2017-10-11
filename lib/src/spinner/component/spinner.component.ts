import { Component, ViewChild, TemplateRef, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { AnimationEvent } from '@angular/animations';
import { TemplatePortal } from '@angular/cdk/portal';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

export enum SpinnerType {
  Circular = <any>'circular',
  Linear = <any>'linear',
}

export enum SpinnerMode {
  Determinate = <any>'determinate',
  Indeterminate = <any>'indeterminate',
}

export enum SpinnerStrategy {
  Overlay = <any>'overlay',
  Replace = <any>'replace',
}

export enum SpinnerStyle {
  FullScreen = <any>'fullscreen',
  Overlay = <any>'overlay',
  None = <any>'none',
}

import { FadeInOutAnimation } from '../../utils/utils.module';

@Component({
  selector: 'psn-spinner',
  styleUrls: ['./spinner.component.scss' ],
  templateUrl: './spinner.component.html',
  animations: [
    FadeInOutAnimation(),
  ],
})
export class SpinnerComponent {

  private _animationIn: Subject<any> = new Subject<any>();
  private _animationOut: Subject<any> = new Subject<any>();
  private _mode: SpinnerMode = SpinnerMode.Indeterminate;
  private _defaultMode: SpinnerMode = this._mode;
  private _value: number = 0;

  animation: boolean = false;

  content: TemplatePortal<any>;

  set mode(mode: SpinnerMode) {
    this._defaultMode = mode;
  }
  get mode(): SpinnerMode {
    return this._mode;
  }

  set value(value: number) {
    this._value = value;
    this._changeDetectorRef.markForCheck();
  }
  get value(): number {
    return this._value;
  }

  style: SpinnerStyle = SpinnerStyle.None;

  height: number;

  type: SpinnerType = SpinnerType.Circular;

  color: 'primary' | 'accent' | 'warn' | 'success' | 'secondary' = 'primary';

  constructor(private _changeDetectorRef: ChangeDetectorRef) {}

  getHeight(): string {
    // Ignore height if style is `overlay` or `fullscreen`.
    // Add height if child elements have a height and style is `none`, else return default height.
    if (this.isOverlay() || this.isFullScreen()) {
      return undefined;
    } else {
      return this.height ? `${this.height}px` : '150px';
    }
  }

  getCircleDiameter(): string {
    if (this.height) {
      let diameter: number = this.height * (2 / 3);
      if (diameter < 60) {
        return `${diameter}px`;
      }
    }
    return '60px';
  }

  isCircular(): boolean {
    return this.type === SpinnerType.Circular;
  }

  isLinear(): boolean {
    return this.type === SpinnerType.Linear;
  }

  isFullScreen(): boolean {
    return this.style === SpinnerStyle.FullScreen;
  }

  isOverlay(): boolean {
    return this.style === SpinnerStyle.Overlay;
  }

  animationComplete(event: AnimationEvent): void {
    // Check to see if its "in" or "out" animation to execute the proper callback
    if (!event.fromState) {
      this.inAnimationCompleted();
    } else {
      this.outAnimationCompleted();
    }
  }

  inAnimationCompleted(): void {
    this._animationIn.next(undefined);
  }

  outAnimationCompleted(): void {
   /* little hack to reset the loader value and animation before removing it from DOM
    * else, the loader will appear with prev value when its registered again
    * and will do an animation going prev value to 0.
    */
    this.value = 0;
    // Check for changes for `OnPush` change detection
    this._changeDetectorRef.markForCheck();
    this._animationOut.next(undefined);
  }

  /**
   * Starts in animation and returns an observable for completition event.
   */
  startInAnimation(): Observable<any> {
    /* need to switch back to the selected mode, so we have saved it in another variable
    *  and then recover it. (issue with protractor)
    */
    this._mode = this._defaultMode;
    // Check for changes for `OnPush` change detection
    this.animation = true;
    this._changeDetectorRef.markForCheck();
    return this._animationIn.asObservable();
  }

  /**
   * Starts out animation and returns an observable for completition event.
   */
  startOutAnimation(): Observable<any> {
    this.animation = false;
    /* need to switch back and forth from determinate/indeterminate so the setInterval()
    * inside mat-progress-spinner stops and protractor doesnt timeout waiting to sync.
    */
    this._mode = SpinnerMode.Determinate;
    // Check for changes for `OnPush` change detection
    this._changeDetectorRef.markForCheck();
    return this._animationOut.asObservable();
  }
}
