import { Component, Input, ViewChild } from '@angular/core';

import { MdSidenav, MdDrawerToggleResult } from '@angular/material';

@Component({
  selector: 'nav-side-content',
  template: '<ng-content></ng-content>',
})
export class NavSideMenuDirective {

}

@Component({
  selector: 'nav-layout',
  styleUrls: ['./nav.component.scss'],
  templateUrl: './nav.component.html',
})
export class NavLayoutComponent {   

  @ViewChild(MdSidenav) sidenav: MdSidenav;

  public toggle(): Promise<MdDrawerToggleResult> {
    return this.sidenav.toggle();
  }


  public open(): Promise<MdDrawerToggleResult> {
    return this.sidenav.open();
  }

  public close(): Promise<MdDrawerToggleResult> {
    return this.sidenav.close();
  }

  /**
   * root?: true | false
   *   
   */
  @Input('root') root: boolean;
 
  public isRootLayout(): boolean {
    return this.root;
  }
  
}
