import { Type } from '@angular/core';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MdSidenavModule, MdToolbarModule, MdButtonModule, MdIconModule, MdCardModule, MdListModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { NavLayoutComponent, NavSideMenuDirective } from './nav.component';
import { NavContentComponent } from './nav-content/nav-content.component';
import { NavListComponent } from './nav-list/nav-list.component';
import { NavManageListComponent } from './nav-manage-list/nav-manage-list.component';
import { NavFooterComponent } from './footer/nav-footer.component';
import { NavToolbarContentComponent } from './toolbar/nav-toolbar.component';

import { NavDrawerComponent, NavDrawerMenuDirective } from './drawer/drawer.component';

const NAV_COMPS: Type<any>[] = [
  NavLayoutComponent,
  NavContentComponent,
  NavListComponent,
  NavManageListComponent,
  NavFooterComponent,
  NavToolbarContentComponent,
  NavDrawerComponent,
  NavDrawerMenuDirective,
  NavSideMenuDirective
];

export { NavLayoutComponent, NavContentComponent, NavListComponent, NavToolbarContentComponent,
          NavManageListComponent,
          NavFooterComponent, NavDrawerComponent, NavDrawerMenuDirective, NavSideMenuDirective };

@NgModule({
  imports: [
    CommonModule,
    MdSidenavModule,
    MdToolbarModule,
    MdButtonModule,
    MdIconModule,
    MdCardModule,
    MdListModule,
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
