## Usage
```html
<!-- only the main layout should have the root as true. Default is false -->
 <nav-layout #layout [root]="true">
    <!-- drawer  not mandatory-->
    <nav-drawer *ngIf="currentUser?.loggedIn"  class="mainDrawer" logo="assets:logo-mark" sidenavTitle="Pattern Lib" name="{{ currentUser?.firstName }} {{ currentUser?.lastName }}" email="{{ currentUser?.email }}">
      <mat-nav-list >
        <ng-template let-item let-last="last" ngFor [ngForOf]="routes">
          <a mat-list-item [routerLink]="[item.route]" (click)="layout.close()">
            <mat-icon>{{item.icon}}</mat-icon>{{item.title}}</a>
        </ng-template>
      </mat-nav-list>
      <mat-nav-list td-navigation-drawer-menu>
        <a mat-list-item (click)="layout.close();logout()">
          <mat-icon>exit_to_app</mat-icon>Sign out</a>
      </mat-nav-list>
    </nav-drawer>

    <!-- here is where our layout with header and footer, nav bar is -->
    <!-- todo hide all this if not logged in -->

    <nav-content  [hideMenu]="!currentUser?.loggedIn">

      <!-- header toolbar -->
      <nav-toolbar-content>
         <a mat-icon-button mdTooltip="Our new pattern lib" >
          <mat-icon svgIcon="assets:logo"></mat-icon>
        </a>
        <span>Pattern Lib </span>
        <span *ngIf="!currentUser?.loggedIn" fxFlex></span>
        <span *ngIf="currentUser?.loggedIn" fxLayout="row" fxLayoutAlign="center" fxFlex fxShow fxHide.xs>
          <button mat-button class="text-upper">dashboard</button>
          <button mat-button class="text-upper">examinees</button>
          <button mat-button class="text-upper">test sessions</button>
        </span>
        <span fxFlex fxHide fxShow.xs></span>
        <button mat-icon-button [mdMenuTriggerFor]="notificationsMenu">
          <psn-badge color="success" notifications="4">
            <mat-icon>apps</mat-icon>
          </psn-badge>
        </button>
        <mat-menu #notificationsMenu="mdMenu">
          <psn-menu>
            <div psn-menu-header class="mat-subhead">Your Options</div>
            <mat-nav-list dense psn-menu-content>
              <a *ngIf="currentUser?.loggedIn" mat-list-item [routerLink]="['/assessments/dashboard']">
                <mat-icon mat-list-avatar>system_update_alt</mat-icon>
                <h4 mat-line><span class="text-wrap">Assessments</span></h4>
                <p mat-line>2 incoming results</p>
              </a>
              <a *ngIf="currentUser?.loggedIn" mat-list-item [routerLink]="['/users']">
                <mat-icon mat-list-avatar>dashboard</mat-icon>
                <h4 mat-line><span class="text-wrap">Users</span></h4>
                <p mat-line>some users have been using</p>
              </a>
              <a *ngIf="currentUser?.loggedIn" mat-list-item [routerLink]="['/email']">
                <mat-icon mat-list-avatar>email</mat-icon>
                <h4 mat-line><span class="text-wrap">Email</span></h4>
                <p mat-line>you got mail</p>
              </a>
              <mat-divider></mat-divider>
              <a mat-list-item (click)="changeTheme()">
                <mat-icon mat-list-avatar>system_update_alt</mat-icon>
                <h4 mat-line><span class="text-wrap">Change App Theme</span></h4>
                <p mat-line>cycle thru the available themes</p>
              </a>
              <mat-divider *ngIf="currentUser?.loggedIn"></mat-divider>
               <a *ngIf="currentUser?.loggedIn" mat-list-item (click)="logout()">
                <mat-icon mat-list-avatar>exit_to_app</mat-icon>
                <h4 mat-line><span class="text-wrap">Sign out</span></h4>
                <p mat-line>logs you out of the application</p>
              </a>
            </mat-nav-list>
           
            <a mat-button color="accent" psn-menu-footer td-menu-footer href="https://github.com/" target="_blank">
              View Code
            </a> 
          </psn-menu>
        </mat-menu>

         <a *ngIf="currentUser?.loggedIn" mdTooltip="Sign out" mat-icon-button (click)="logout()">
          <mat-icon>exit_to_app</mat-icon></a>
          <a mat-icon-button mdTooltip="Github" href="https://github.com/" target="_blank">
            <mat-icon svgIcon="assets:github"></mat-icon>
          </a>
      </nav-toolbar-content>
      <!-- toolbar ends -->
     
        <nav-body class="any-class-you-like-for-the-content">
           <router-outlet></router-outlet>
        </nav-body>

      <!-- footer -->
      <nav-footer>
        
          <span class="mat-caption">Copyright &copy; .... All rights reserved</span>
          <span fxFlex></span>
          <mat-icon>wifi</mat-icon> 
        
      </nav-footer>

    </nav-content>

  </nav-layout>
```