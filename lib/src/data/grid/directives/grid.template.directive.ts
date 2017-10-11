import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { TemplatePortalDirective } from '@angular/cdk/portal';

@Directive({selector: '[psnGridColumnTemplate]ng-template'})
export class GridCustomColumnTemplateDirective extends TemplatePortalDirective {

  @Input() psnGridColumnTemplate: string;
  constructor(templateRef: TemplateRef<any>, viewContainerRef: ViewContainerRef) {
    super(templateRef, viewContainerRef);
  }
}
