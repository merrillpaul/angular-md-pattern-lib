import { Directive, ElementRef, Input, Output, EventEmitter, HostBinding, Renderer2, ChangeDetectorRef } from '@angular/core';
import { animate, AnimationBuilder, AnimationPlayer, AUTO_STYLE, style, animation } from '@angular/animations';
import { trigger, state, transition, AnimationTriggerMetadata } from '@angular/animations';

@Directive({
  selector: '[psnFade]',
})
export class PearsonFadeDirective {

  private _state: boolean;
  private _defaultOpacity: string;
  private _defaultDisplay: string;
  private _animationFadeInPlayer: AnimationPlayer;
  private _animationFadeOutPlayer: AnimationPlayer;


  /**
   * duration?: number
   * Sets duration of fade animation in miliseconds.
   * Defaults to 150 ms.
   */
  @Input() duration: number = 150;

  /**
   * tdFade: boolean
   * Fades element, FadesOut if its 'true', FadesIn if its 'false'.
   */
  @Input('psnFade')
  set state(state: boolean) {
    this._state = state;
    if (state) {
      if (this._animationFadeOutPlayer) {
        this._animationFadeOutPlayer.destroy();
        this._animationFadeOutPlayer = undefined;
      }
      this.hide();
    } else {
      if (this._animationFadeInPlayer) {
        this._animationFadeInPlayer.destroy();
        this._animationFadeInPlayer = undefined;
      }
      this.show();
    }
  }

  /**
   * fadeIn?: function
   * Method to be executed when fadeIn animation ends.
   */
  @Output('fadeIn') fadeIn: EventEmitter<void> = new EventEmitter<void>();

  /**
   * fadeOut?: function
   * Method to be executed when fadeOut animation ends.
   */
  @Output('fadeOut') fadeOut: EventEmitter<void> = new EventEmitter<void>();

  /**
   * Binds native 'aria-expanded' attribute.
   */
  @HostBinding('attr.aria-expanded')
  get ariaExpandedBinding(): boolean {
    return !this._state;
  }

  /**
   * Binds native 'aria-hidden' attribute.
   */
  @HostBinding('attr.aria-hidden')
  get ariaHiddenBinding(): boolean {
    return this._state;
  }

  constructor(private _renderer: Renderer2,
              private _element: ElementRef,
              private _changeDetectorRef: ChangeDetectorRef,
              private _animationBuilder: AnimationBuilder) {
    this._defaultDisplay = this._element.nativeElement.style.display;
  }

  /**
   * Hides element: starts animation and adds "display:'none'" style at the end.
   */
  hide(): void {
    this._animationFadeInPlayer = this._animationBuilder.build(animation([
      style({
        opacity: AUTO_STYLE,
        display: AUTO_STYLE,
      }),
      animate(this.duration + 'ms ease-out', style({opacity: '0'})),
    ])).create(this._element.nativeElement);
    this._animationFadeInPlayer.onDone(() => {
      this._onFadeInDone();
    });
    this._animationFadeInPlayer.play();
  }

  /**
   * Shows element: sets "display:[default]" so animation is shown.
   */
  show(): void {
   this._renderer.setStyle(this._element.nativeElement, 'display', this._defaultDisplay);
    this._changeDetectorRef.markForCheck();
    this._animationFadeOutPlayer = this._animationBuilder.build(animation([
      style({
        opacity: '0',
        display: 'none',
      }),
      animate(this.duration + 'ms ease-in', style({opacity: AUTO_STYLE})),
    ])).create(this._element.nativeElement);
    this._animationFadeOutPlayer.onDone(() => {
      this._onFadeOutDone();
    });
    this._animationFadeOutPlayer.play();
  }

  private _onFadeInDone(): void {
    if (this._animationFadeInPlayer) {
      this._animationFadeInPlayer.destroy();
      this._animationFadeInPlayer = undefined;
      this._renderer.setStyle(this._element.nativeElement, 'display', 'none');
      this._changeDetectorRef.markForCheck();
      this.fadeIn.emit();
    }
  }

  private _onFadeOutDone(): void {
    if (this._animationFadeOutPlayer) {
      this._animationFadeOutPlayer.destroy();
      this._animationFadeOutPlayer = undefined;
      this._changeDetectorRef.markForCheck();
      this.fadeOut.emit();
    }
  }
}

export function FadeInOutAnimation(duration: number = 150): AnimationTriggerMetadata {
  return trigger('fadeInOut', [
    state('0', style({
      opacity: '0',
      display: 'none',
    })),
    state('1',  style({
      opacity: '*',
      display: '*',
    })),
    transition('0 => 1', animate(duration + 'ms ease-in')),
    transition('1 => 0', animate(duration + 'ms ease-out')),
  ]);
}

export function FadeOnEnterAnimation(duration: number = 150): AnimationTriggerMetadata {
  return trigger('fadeOnEnter', [
  transition(':enter', [
          style({opacity: 0}),
          animate(`${duration}ms ease-in`, style({opacity: 1}))
        ]),
        transition(':leave', [
          style({opacity: 1}),
          animate(`${duration}ms ease-out`, style({opacity: 0}))
        ])
  ]);
}
