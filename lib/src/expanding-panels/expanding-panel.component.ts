import {
  Component, Renderer2, ElementRef, ChangeDetectorRef,
  Directive, Input, Output, TemplateRef, ViewContainerRef, ContentChild
} from '@angular/core';
import { EventEmitter } from '@angular/core';
import { TemplatePortalDirective } from '@angular/material';

import { CollapseAnimation } from '../utils/animation/collapse';

@Component({
  selector: 'expanding-panel-content',
  template: '<ng-content></ng-content>',
})
export class ExpandingPanelContentComponent { }

/*
@Component({
  selector: 'expanding-panel-header-content',
  template: '<ng-content></ng-content>',
})
export class ExpandingPanelHeaderComponent {}*/

@Component({
  selector: 'expanding-panel-summary',
  template: '<ng-content></ng-content>',
})
export class ExpandingPanelSummaryComponent { }

@Component({
  selector: 'psn-expanding-panel',
  styleUrls: ['./expanding-panel.component.scss'],
  templateUrl: './expanding-panel.component.html',
  animations: [
    CollapseAnimation(),
  ],
})
export class ExpandingPanelComponent {

  private _expand: boolean = false;
  private _keepSummary: boolean = false;
  private _disabled: boolean = false;
  appliedColor: string = 'primary';

  constructor(private _renderer: Renderer2,
    private _changeDetectorRef: ChangeDetectorRef,
    private _elementRef: ElementRef) {
    this._renderer.addClass(this._elementRef.nativeElement, 'psn-expanding-panel');
  }


  @Input() closeable: boolean = true;

  @Input('color')
  set color(color: string) {
    if (color === 'primary' || color === 'accent' || color === 'warn' || color === 'success' || color === 'secondary'
    || color === 'lime' || color === 'yellow' || color === 'link') {
       this.appliedColor = 'mat-' + color;
    } else {
      this.appliedColor = color;
    }   
    this._changeDetectorRef.markForCheck();
  }
  
  
  @Input('keepSummary')
  set keepSummary(keepSummary: boolean) {
    this._keepSummary = keepSummary;
  }

  get keepSummary(): boolean {
    return this._keepSummary === true ? true: !this._expand;
  }

  @Input('expand')
  set expand(expand: boolean) {
    this._setExpand(expand);
  }
  get expand(): boolean {
    return this._expand;
  }


  @Input('disabled')
  set disabled(disabled: boolean) {
    if (disabled && this._expand) {
      this._expand = false;
      this._onCollapsed();
    }
    this._disabled = disabled;
  }
  get disabled(): boolean {
    return this._disabled;
  }


  @Output() expanded: EventEmitter<void> = new EventEmitter<void>();


  @Output() collapsed: EventEmitter<void> = new EventEmitter<void>();

  @Output() closed: EventEmitter<void> = new EventEmitter<void>();


  clickEvent(): void {
    this._setExpand(!this._expand);
  }

  closeEvent(event): void {
    event.stopPropagation();
    this.closed.emit(undefined);
  }

  toggle(): boolean {
    return this._setExpand(!this._expand);
  }


  open(): boolean {
    return this._setExpand(true);
  }


  close(): boolean {
    return this._setExpand(false);
  }


  private _setExpand(newExpand: boolean): boolean {
    if (this._disabled) {
      return false;
    }
    if (this._expand !== newExpand) {
      this._expand = newExpand;
      if (newExpand) {
        this._onExpanded();
      } else {
        this._onCollapsed();
      }
      return true;
    }
    return false;
  }

  private _onExpanded(): void {
    this.expanded.emit(undefined);
  }

  private _onCollapsed(): void {
    this.collapsed.emit(undefined);
  }
}
