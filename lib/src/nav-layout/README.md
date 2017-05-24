## Usage
```html
<nav-layout  #mainLayout|orwhatevver_refname>
  <nav-drawer sidenavTitle="title" logo="logo" icon="icon" name="name" color="color" navigationRoute="/">
    .. main drawer content
    <nav-drawer-menu>
      .. menu drawer menu
    </nav-drawer-menu>
  </nav-drawer>

  <nav-side-content>
   .. sidenav content
  </nav-side-content>
  

  .. main content or
  <nav-content [root]="true|false">

    <div toolbar-content>
    
    </div>

     main content
     <nav-footer>
        <div fxLayout="row" >
          <span class="md-caption">Copyright &copy; .... All rights reserved</span>
          <span flex></span>         
        </div>
      </nav-footer>
  <nav-content>

</nav-layout>
```


```html
<nav-layout #mainLayout>

  <!-- drawer -->
  <nav-drawer sidenavTitle="Assessment Options" icon="menu" name="name" color="success">

    <nav-side-content>
      <md-nav-list>
        <a md-list-item>
          <md-icon>wifi</md-icon>
          Setup Assessment Wifi
        </a>
        <a md-list-item>
          <md-icon>event</md-icon>
          Add Note
        </a>
      </md-nav-list>
    </nav-side-content>
    <nav-drawer-menu>
      <md-nav-list>
        <a md-list-item>
          <md-icon>wifi</md-icon>
          More Info
        </a>
        <a md-list-item>
          <md-icon>event</md-icon>
          More..
        </a>
      </md-nav-list>
    </nav-drawer-menu>
  </nav-drawer>


  <nav-content [root]="true|false" color="not_mandatory | any theme color" >

    <nav-toolbar-content>
      <span>Create Assessment</span>
      <span fxFlex></span>
      <button md-icon-button [mdMenuTriggerFor]="notificationsMenu1">
        <psn-badge color="warn" notifications="66+">
          <md-icon>notifications</md-icon>
        </psn-badge>
      </button>
      <md-menu #notificationsMenu1="mdMenu" [overlapTrigger]="false">
        etc
      </md-menu>
    </nav-toolbar-content>

    <nav-footer color="warn">      
        <span class="md-caption">Copyright &copy; .... All rights reserved</span>
        <span flex></span>
        <md-icon>wifi</md-icon>      
    </nav-footer>

    <nav-manage-list [opened]="media.query('gt-sm')" [mode]="(media.query('gt-sm')) ? 'side' : 'push'" [sidenavWidth]="(media.query('gt-xs')) ? '257px' : '100%'">
      <md-nav-list sidenav-content>
        ... sidenav content
      </md-nav-list>
      <nav-toolbar-content>
        <span>WIAT-III</span>
        <span fxFlex></span>
        <button md-icon-button >         
            <md-icon>edit</md-icon>          
        </button>
      <nav-toolbar-content>
      ....
    </nav-manage-list>
  </nav-content>
</nav-layout>
```

or 
```html
<nav-layout #kitchenLayout>

  <nav-content [hideMenu]="true" color="">

    <nav-toolbar-content>
      <button (click)="kitchenSideNav.toggle()" md-icon-button><md-icon class="md-24">menu</md-icon></button>
      <span fxFlex></span>
      <button md-icon-button><md-icon class="md-24">view_module</md-icon></button>
      <button md-icon-button><md-icon class="md-24">sort</md-icon></button>
      <button md-icon-button><md-icon class="md-24">settings</md-icon></button>
      <button md-icon-button><md-icon class="md-24">more_vert</md-icon></button>
    </nav-toolbar-content>
    
    <nav-manage-list #kitchenSideNav [opened]="media.query('gt-sm')" [mode]="(media.query('gt-sm')) ? 'side' : 'push'" [sidenavWidth]="(media.query('gt-xs')) ? '20%' : '100%'">

      <md-nav-list sidenav-content>
        <ng-template spin="kitchen.side.load">
          <ng-template let-item let-last="last" ngFor [ngForOf]="items">
            <a md-list-item [routerLink]="[item.route]" [routerLinkActive]="['active']" [routerLinkActiveOptions]="{exact:true}" (click)="!media.query('gt-sm') && kitchenSideNav.close()">
              <md-icon md-list-avatar>{{item.icon}}</md-icon>
              <h3 md-line> {{item.title}} </h3>
              <p md-line> {{item.description}} </p>
            </a>
            <md-divider *ngIf="!last" md-inset></md-divider>
          </ng-template>
        </ng-template>
      </md-nav-list>



      <router-outlet></router-outlet>

    </nav-manage-list>
  </nav-content>

</nav-layout>
```