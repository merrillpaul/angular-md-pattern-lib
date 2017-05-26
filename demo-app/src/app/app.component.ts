import { Component, HostBinding, ViewContainerRef, AfterViewInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MdIconRegistry } from '@angular/material';
import { OverlayContainer } from '@angular/material';
import { Router, NavigationEnd } from '@angular/router';

import { SpinnerService, ToastService, MediaQueryService } from '@pearson/angular-material';

import { SecurityService, UserDetails } from './core/services';

import { fadeAnimation } from './app.animations';


@Component({
  selector: 'psn-ng-lib-demo-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeAnimation]
})
export class AppComponent implements AfterViewInit {


  currentUser: UserDetails;
  currentPage: string;
  currentThemeIdx: number = 5;
  themes: string[] = [
    'pearson_dark_theme',
    'pearson_theme'
  ]
  routes: Object[] = [{
    title: 'Library McPattern',
    route: '/kitchensink',
    icon: 'local_library',
  }, {
    title: 'Example Logs',
    route: '/logs',
    icon: 'receipt',
  },/*{
    title: 'Dashboard',
    route: '/dashboard',
    icon: 'dashboard',
  }, {
    title: 'Global Library',
    route: '/product',
    icon: 'view_quilt',
  }, */{
    title: 'Manage Users',
    route: '/users',
    icon: 'people',
  }

  ];

  constructor(private _iconRegistry: MdIconRegistry,
    private _domSanitizer: DomSanitizer,
    private overlayContainer: OverlayContainer,
    private spinnerService: SpinnerService,
    public media: MediaQueryService,
    private _vcr: ViewContainerRef,
    private _toastService: ToastService,
    public security: SecurityService,
    private _router: Router) {


    this._iconRegistry.addSvgIconInNamespace('assets', 'github',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/github.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'logo',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/github_logo.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'logo-mark',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/logo.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'appcenter',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/appcenter.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'listener',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/listener.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'querygrid',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/querygrid.svg'));

    this._router.events.subscribe((val) => this.onRouterChange(val));


    this.security.currentUser.subscribe((user) => {
      this.currentUser = user;
    });

  }

  ngAfterViewInit(): void {
    this._toastService.setup(this._vcr);


  }

  logout(): void {
    this.spinnerService.register();
    alert('Mock logout');
    setTimeout(() => {
      this.security.markLogout();
      this._router.navigate(['/login']).then(() => {
        this.spinnerService.resolve();
      });
    }, 2000);

  }

  changeTheme(): void {
    if (this.currentThemeIdx + 1 === this.themes.length) {
      this.currentThemeIdx = 0;
    } else {
      this.currentThemeIdx++;
    }
    let theme = this.themes[this.currentThemeIdx];
    let clist = this.overlayContainer.getContainerElement().classList;
    this.themes.forEach((it) => {
      if (it !== '' && clist.contains(it)) {
        this.overlayContainer.getContainerElement().classList.remove(it);
      }
    });
    if (theme !== '') {
      this.overlayContainer.getContainerElement().classList.add(theme);
    }
  }

  public get theme(): string {
    return this.themes[this.currentThemeIdx];
  }

  private onRouterChange(val): void {
    if (val instanceof NavigationEnd) {
      let fragments = val.urlAfterRedirects.split('/').join('_');
      console.log('Url frags ', fragments);
      this.currentPage = fragments
    }
  }
}
