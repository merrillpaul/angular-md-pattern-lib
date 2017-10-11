import { Type } from '@angular/core';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MatSidenavModule, MatToolbarModule, MatButtonModule, MatIconModule, MatCardModule, MatListModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { NavLayoutComponent, NavSideMenuDirective } from './nav.component';
import { NavContentComponent } from './nav-content/nav-content.component';
import { NavBodyComponent } from './nav-body/nav-body.component';
import { NavManageListComponent } from './nav-manage-list/nav-manage-list.component';
import { NavFooterComponent } from './footer/nav-footer.component';
import { NavToolbarContentComponent } from './toolbar/nav-toolbar.component';

import { NavDrawerComponent, NavDrawerMenuDirective } from './drawer/drawer.component';

const NAV_COMPS: Type<any>[] = [
  NavLayoutComponent,
  NavContentComponent,
  NavManageListComponent,
  NavFooterComponent,
  NavToolbarContentComponent,
  NavDrawerComponent,
  NavDrawerMenuDirective,
  NavSideMenuDirective,
  NavBodyComponent
];

export { NavLayoutComponent, NavContentComponent, NavToolbarContentComponent,
          NavManageListComponent,
          NavFooterComponent, NavDrawerComponent, NavDrawerMenuDirective, NavSideMenuDirective, NavBodyComponent };

@NgModule({
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    FlexLayoutModule
  ],
  declarations: [
    NAV_COMPS,
  ],
  exports: [
    NAV_COMPS,
  ],
})
export class PearsonNavModule {

}
