import { Component, Input, ViewChild } from '@angular/core';

import { MatSidenav, MatDrawerToggleResult } from '@angular/material';

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

  @ViewChild(MatSidenav) sidenav: MatSidenav;

  public toggle(): Promise<MatDrawerToggleResult> {
    return this.sidenav.toggle();
  }


  public open(): Promise<MatDrawerToggleResult> {
    return this.sidenav.open();
  }

  public close(): Promise<MatDrawerToggleResult> {
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
