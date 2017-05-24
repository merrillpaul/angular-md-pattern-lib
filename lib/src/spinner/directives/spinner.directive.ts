import { Directive, Input, OnInit, OnDestroy } from '@angular/core';
import { ViewContainerRef, TemplateRef } from '@angular/core';

import { SpinnerType, SpinnerMode, SpinnerStrategy, SpinnerComponent } from '../component/spinner.component';
import { SpinnerService } from '../services/spinner.service';
import { SpinnerRef } from '../services/spinner.factory';


export class SpinnerContext {
  public $implicit: any = undefined;
  public spin: any = undefined;
}

let SPINNER_ID: number = 0;

@Directive({
  selector: '[spin]',
})
export class SpinnerDirective implements OnInit, OnDestroy {

  private _context: SpinnerContext = new SpinnerContext();
  private _type: SpinnerType;
  private _mode: SpinnerMode;
  private _strategy: SpinnerStrategy;
  private _name: string;
  private _loadingRef: SpinnerRef;

  @Input('spin')
  set name(name: string) {
    if (!this._name) {
      if (name) {
        this._name = name;
      }
    }
  }

  /**
   * 
   * If its null, undefined or false it will be used to register requests to the mask.
   * Else if its any value that can be resolved as true, it will resolve the mask.
   * [name] is optional when using [until], but can still be used to register/resolve it manually.
   */
  @Input('spinUntil')
  set until(until: any) {
    if (!this._name) {
      this._name = 'spin-until-' + SPINNER_ID++;
    }
    this._context.$implicit = this._context.spin = until;
    if (!until) {
      this._spinnerService.register(this._name);
    } else {
      this._spinnerService.resolveAll(this._name);
    }
  }

  @Input('spinType')
  set type(type: SpinnerType) {
    switch (type) {
      case SpinnerType.Linear:
        this._type = SpinnerType.Linear;
        break;
      default:
        this._type = SpinnerType.Circular;
        break;
    }
  }

  
  @Input('spinMode')
  set mode(mode: SpinnerMode) {
    switch (mode) {
      case SpinnerMode.Determinate:
        this._mode = SpinnerMode.Determinate;
        break;
      default:
        this._mode = SpinnerMode.Indeterminate;
        break;
    }
  }

  
  @Input('spinStrategy')
  set strategy(stategy: SpinnerStrategy) {
    switch (stategy) {
      case SpinnerStrategy.Overlay:
        this._strategy = SpinnerStrategy.Overlay;
        break;
      default:
        this._strategy = SpinnerStrategy.Replace;
        break;
    }
  }

  @Input('spinColor') color: 'primary' | 'accent' | 'warn' | 'success' | 'secondary' = 'primary';

  constructor(private _viewContainerRef: ViewContainerRef,
              private _templateRef: TemplateRef<Object>,
              private _spinnerService: SpinnerService) {}

  ngOnInit(): void {
    this._registerComponent();
  }

  /**
   * Remove component when directive is destroyed.
   */
  ngOnDestroy(): void {
    this._spinnerService.removeComponent(this._name);
    this._loadingRef = undefined;
  }

  /**
   * Creates spinner and attaches it to this directive's [ViewContainerRef].
   * Passes this directive's [TemplateRef] to modify DOM depending on loading `strategy`.
   */
  private _registerComponent(): void {
    if (!this._name) {
      throw new Error('Name is needed to register loading directive');
    }
    // Check if component has been created before trying to add one again.
    // There is a weird edge case when using `[routerLinkActive]` that calls the `ngOnInit` twice in a row
    if (!this._loadingRef) {
      this._loadingRef = this._spinnerService.createComponent({
        name: this._name,
        type: this._type,
        mode: this._mode,
        color: this.color,
        strategy: this._strategy,
      }, this._viewContainerRef, this._templateRef, this._context);
    }
  }
}
