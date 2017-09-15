import { Component, Directive, Input, ContentChildren, OnInit, OnDestroy, forwardRef, Inject,
         QueryList, SecurityContext, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { SafeResourceUrl, SafeStyle, DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs/Subscription';

import { MdDrawerToggleResult } from '@angular/material';

import { NavLayoutComponent } from '../nav.component';

import { CollapseAnimation } from '../../utils/utils.module';

@Component({
  selector: 'nav-drawer-menu',
  template: '<ng-content></ng-content>',
})
export class NavDrawerMenuDirective {

}

@Component({
  selector: 'nav-drawer',
  styleUrls: ['./drawer.component.scss' ],
  templateUrl: './drawer.component.html',
  animations: [ CollapseAnimation() ],
})
export class NavDrawerComponent implements OnInit, OnDestroy {

  private _closeSubscription: Subscription;
  private _menuToggled: boolean = false;
  private _backgroundImage: SafeStyle;

  get menuToggled(): boolean {
    return this._menuToggled;
  }

  @ContentChildren(NavDrawerMenuDirective) _drawerMenu: QueryList<NavDrawerMenuDirective>;

  /**
   * Checks if there is a [TdNavigationDrawerMenuDirective] as content.
   */
  get isMenuAvailable(): boolean {
    return this._drawerMenu.length > 0;
  } 

  /**
   * sidenavTitle?: string
   * Title set in sideNav.
   */
  @Input('sidenavTitle') sidenavTitle: string;

  /**
   * icon?: string
   *
   * icon name to be displayed before the title
   */
  @Input('icon') icon: string;

  /**
   * logo?: string
   *
   * logo icon name to be displayed before the title.
   * If [icon] is set, then this will not be shown.
   */
  @Input('logo') logo: string;

  /**
   * color?: string
   *
   * toolbar color option: primary | accent | warn.
   * If [color] is not set, default is used.
   */
  @Input('color') color: string;

  /**
   * navigationRoute?: string
   *
   * option to set the combined route for the icon, logo, and sidenavTitle.
   */
  @Input('navigationRoute') navigationRoute: string;  

  /**
   * name?: string
   *
   * string to be displayed as part of the navigation drawer sublabel.
   * if [email] is not set, then [name] will be the toggle menu text.
   */
  @Input('name') name: string;

  /**
   * email?: string
   *
   * string to be displayed as part of the navigation drawer sublabel in the [toggle] menu text.
   * if [email] and [name] are not set, then the toggle menu is not rendered.
   */
  @Input('email') email: string;

  /**
   * Checks if router was injected.
   */
  get routerEnabled(): boolean {
    return !!this._router && !!this.navigationRoute;
  }

  constructor(@Inject(forwardRef(() => NavLayoutComponent)) private _layout: NavLayoutComponent,
              @Optional() private _router: Router,
              private _sanitize: DomSanitizer) {}

  ngOnInit(): void {
    this._closeSubscription = this._layout.sidenav.onClose.subscribe(() => {
      this._menuToggled = false;
    });
  }

  ngOnDestroy(): void {
    if (this._closeSubscription) {
      this._closeSubscription.unsubscribe();
      this._closeSubscription = undefined;
    }
  }

  toggleMenu(): void {
    if (this.isMenuAvailable) {
      this._menuToggled = !this._menuToggled;
    }
  }

  handleNavigationClick(): void {
    if (this.routerEnabled) {
      this._router.navigateByUrl(this.navigationRoute);
      this.close();
    }
  }

  /**
   * Proxy toggle method to access sidenav from outside (from td-layout template).
   */
  public toggle(): Promise<MdDrawerToggleResult> {
    return this._layout.toggle();
  }

  /**
   * Proxy open method to access sidenav from outside (from td-layout template).
   */
  public open(): Promise<MdDrawerToggleResult> {
    return this._layout.open();
  }

  /**
   * Proxy close method to access sidenav from outside (from td-layout template).
   */
  public close(): Promise<MdDrawerToggleResult> {
    return this._layout.close();
  }
}
