import { Component, Input, forwardRef, Optional, Inject, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { NavLayoutComponent } from '../nav.component';

@Component({
  selector: 'nav-content',
  styleUrls: ['./nav-content.component.scss'],
  templateUrl: './nav-content.component.html',
})
export class NavContentComponent {

  @Input('hideMenu') hideMenu: boolean = false;

  private _root: boolean = false;

  /**
   * toolbarTitle?: string
   *
   * Title set in toolbar.
   */
  @Input('toolbarTitle') toolbarTitle: string;

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
   * toolbar color option: primary | accent | warn | success | secondary.
   * If [color] is not set, primary is used.
   */
  @Input('color') color: string = 'primary';

  /**
   * Toolbar class overrides
   */
  @Input('toolBarClass') toolBarClass: string = '';


  /**
   * to hide tool bar
   */
  @Input('hideToolBar') hideToolBar: boolean = false;

  /**
   * navigationRoute?: string
   *
   * option to set the combined route for the icon, logo, and toolbarTitle.
   */
  @Input('navigationRoute') navigationRoute: string;

  /**
   * Checks if there is a [NavLayoutComponent] as parent.
   */
  get isMainSidenavAvailable(): boolean {
    return !!this._layout;
  }

  /**
   * Checks if router was injected.
   */
  get routerEnabled(): boolean {
    return !!this._router && !!this.navigationRoute;
  }

  constructor( @Optional() @Inject(forwardRef(() => NavLayoutComponent)) private _layout: NavLayoutComponent,
    private _changeDetectorRef: ChangeDetectorRef,
    @Optional() private _router: Router) { }

  handleNavigationClick(): void {
    if (this.routerEnabled) {
      this._router.navigateByUrl(this.navigationRoute);
    }
  }

  /**
   * If main sidenav is available, it will open the sidenav of the parent [NavLayoutComponent].
   */
  openMainSidenav(): void {
    this._layout.open();
  }

  @Input('root')
  set root(root: boolean) {
    this._root = root;
    this._changeDetectorRef.markForCheck();
  }

  get root(): boolean {
    if (this._layout) {
      return this._layout.isRootLayout();
    }
    return this._root;
  }
}
