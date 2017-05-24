import { Type } from '@angular/core';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MdRippleModule, MdIconModule, PortalModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ExpandingPanelComponent, ExpandingPanelContentComponent,
         ExpandingPanelSummaryComponent } from './expanding-panel.component';


export { ExpandingPanelComponent } from './expanding-panel.component';

@NgModule({
  imports: [
    CommonModule,
    MdRippleModule,
    MdIconModule,
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
