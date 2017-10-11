import { Type } from '@angular/core';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MatRippleModule, MatIconModule } from '@angular/material';
import { PortalModule } from '@angular/cdk/portal';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ExpandingPanelComponent, ExpandingPanelContentComponent,
         ExpandingPanelSummaryComponent } from './expanding-panel.component';


export { ExpandingPanelComponent } from './expanding-panel.component';

@NgModule({
  imports: [
    CommonModule,
    MatRippleModule,
    MatIconModule,
    PortalModule,
    FlexLayoutModule
  ],
  declarations: [
    ExpandingPanelComponent,
    ExpandingPanelSummaryComponent,
    ExpandingPanelContentComponent
  ],
  exports: [
    ExpandingPanelComponent,
    ExpandingPanelSummaryComponent,
    ExpandingPanelContentComponent
  ],
})
export class PearsonExpandingPanelModule {

}
