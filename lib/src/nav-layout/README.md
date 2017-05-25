## Usage
```html
<!-- only the main layout should have the root as true. Default is false -->
 <nav-layout #layout [root]="true">
    <!-- drawer  not mandatory-->
    <nav-drawer *ngIf="currentUser?.loggedIn"  class="mainDrawer" logo="assets:logo-mark" sidenavTitle="Pattern Lib" name="{{ currentUser?.firstName }} {{ currentUser?.lastName }}" email="{{ currentUser?.email }}">
      <md-nav-list >
        <ng-template let-item let-last="last" ngFor [ngForOf]="routes">
          <a md-list-item [routerLink]="[item.route]" (click)="layout.close()">
            <md-icon>{{item.icon}}</md-icon>{{item.title}}</a>
        </ng-template>
      </md-nav-list>
      <md-nav-list td-navigation-drawer-menu>
        <a md-list-item (click)="layout.close();logout()">
          <md-icon>exit_to_app</md-icon>Sign out</a>
      </md-nav-list>
    </nav-drawer>

    <!-- here is where our layout with header and footer, nav bar is -->
    <!-- todo hide all this if not logged in -->

    <nav-content  [hideMenu]="!currentUser?.loggedIn">

      <!-- header toolbar -->
      <nav-toolbar-content>
         <a md-icon-button mdTooltip="Our new pattern lib" >
          <md-icon svgIcon="assets:logo"></md-icon>
        </a>
        <span>Pattern Lib </span>
        <span *ngIf="!currentUser?.loggedIn" fxFlex></span>
        <span *ngIf="currentUser?.loggedIn" fxLayout="row" fxLayoutAlign="center" fxFlex fxShow fxHide.xs>
          <button md-button class="text-upper">dashboard</button>
          <button md-button class="text-upper">examinees</button>
          <button md-button class="text-upper">test sessions</button>
        </span>
        <span fxFlex fxHide fxShow.xs></span>
        <button md-icon-button [mdMenuTriggerFor]="notificationsMenu">
          <psn-badge color="success" notifications="4">
            <md-icon>apps</md-icon>
          </psn-badge>
        </button>
        <md-menu #notificationsMenu="mdMenu">
          <psn-menu>
            <div psn-menu-header class="md-subhead">Your Options</div>
            <md-nav-list dense psn-menu-content>
              <a *ngIf="currentUser?.loggedIn" md-list-item [routerLink]="['/assessments/dashboard']">
                <md-icon md-list-avatar>system_update_alt</md-icon>
                <h4 md-line><span class="text-wrap">Assessments</span></h4>
                <p md-line>2 incoming results</p>
              </a>
              <a *ngIf="currentUser?.loggedIn" md-list-item [routerLink]="['/users']">
                <md-icon md-list-avatar>dashboard</md-icon>
                <h4 md-line><span class="text-wrap">Users</span></h4>
                <p md-line>some users have been using</p>
              </a>
              <a *ngIf="currentUser?.loggedIn" md-list-item [routerLink]="['/email']">
                <md-icon md-list-avatar>email</md-icon>
                <h4 md-line><span class="text-wrap">Email</span></h4>
                <p md-line>you got mail</p>
              </a>
              <md-divider></md-divider>
              <a md-list-item (click)="changeTheme()">
                <md-icon md-list-avatar>system_update_alt</md-icon>
                <h4 md-line><span class="text-wrap">Change App Theme</span></h4>
                <p md-line>cycle thru the available themes</p>
              </a>
              <md-divider *ngIf="currentUser?.loggedIn"></md-divider>
               <a *ngIf="currentUser?.loggedIn" md-list-item (click)="logout()">
                <md-icon md-list-avatar>exit_to_app</md-icon>
                <h4 md-line><span class="text-wrap">Sign out</span></h4>
                <p md-line>logs you out of the application</p>
              </a>
            </md-nav-list>
           
            <a md-button color="accent" psn-menu-footer td-menu-footer href="https://github.com/" target="_blank">
              View Code
            </a> 
          </psn-menu>
        </md-menu>

         <a *ngIf="currentUser?.loggedIn" mdTooltip="Sign out" md-icon-button (click)="logout()">
          <md-icon>exit_to_app</md-icon></a>
          <a md-icon-button mdTooltip="Github" href="https://github.com/" target="_blank">
            <md-icon svgIcon="assets:github"></md-icon>
          </a>
      </nav-toolbar-content>
      <!-- toolbar ends -->
     
        <nav-body class="any-class-you-like-for-the-content">
           <router-outlet></router-outlet>
        </nav-body>

      <!-- footer -->
      <nav-footer>
        
          <span class="md-caption">Copyright &copy; .... All rights reserved</span>
          <span fxFlex></span>
          <md-icon>wifi</md-icon> 
        
      </nav-footer>

    </nav-content>

  </nav-layout>
```