import { Component, Input, ViewChild } from '@angular/core';

import { MdSidenav, MdSidenavToggleResult } from '@angular/material';


@Component({
  selector: 'nav-side-content',
  template: '<ng-content></ng-content>',
})
export class NavSideMenuDirective {

}

@Component({
  selector: 'nav-layout',
  styleUrls: ['./nav.component.scss' ],
  templateUrl: './nav.component.html',
})
export class NavLayoutComponent {

  @ViewChild(MdSidenav) sidenav: MdSidenav;

  
  public toggle(): Promise<MdSidenavToggleResult> {
    return this.sidenav.toggle();
  }

  
  public open(): Promise<MdSidenavToggleResult> {
    return this.sidenav.open();
  }
  
  public close(): Promise<MdSidenavToggleResult> {
    return this.sidenav.close();
  } 

}
