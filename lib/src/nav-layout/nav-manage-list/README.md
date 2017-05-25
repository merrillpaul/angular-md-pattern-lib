## nav-manage-list


 Manage List Layout:

```html
 <nav-manage-list #kitchenSideNav [opened]="media.query('gt-sm')" [mode]="(media.query('gt-sm')) ? 'side' : 'push'" [sidenavWidth]="(media.query('gt-xs')) ? '250px' : '100%'">
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

      <nav-body>
       <router-outlet></router-outlet>
      </nav-body>       

</nav-manage-list>
```

With Side toolbar
```html
<nav-manage-list #kitchenSideNav [opened]="media.query('gt-sm')" [mode]="(media.query('gt-sm')) ? 'side' : 'push'" [sidenavWidth]="(media.query('gt-xs')) ? '250px' : '100%'">
      <nav-toolbar-content>
          <button (click)="kitchenSideNav.toggle()" md-icon-button><md-icon class="md-24">menu</md-icon></button>
          <span fxFlex></span>
          <button md-icon-button><md-icon class="md-24">view_module</md-icon></button>
          <button md-icon-button><md-icon class="md-24">sort</md-icon></button>
          <button md-icon-button><md-icon class="md-24">settings</md-icon></button>
          <button md-icon-button><md-icon class="md-24">more_vert</md-icon></button>
      </nav-toolbar-content>

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

      <nav-body>
        <router-outlet></router-outlet>
      </nav-body>

    </nav-manage-list>
```

With nav-layout combo
```html
<nav-layout #kitchenLayout>    

    <nav-content [hideToolBar]="false" [hideMenu]="false" color="primary">

      <nav-toolbar-content>
        <button (click)="kitchenSideNav.toggle()" md-icon-button><md-icon class="md-24">menu</md-icon></button>
        <span fxFlex></span>
        <button md-icon-button><md-icon class="md-24">view_module</md-icon></button>
        <button md-icon-button><md-icon class="md-24">sort</md-icon></button>
        <button md-icon-button><md-icon class="md-24">settings</md-icon></button>
        <button md-icon-button><md-icon class="md-24">more_vert</md-icon></button>
      </nav-toolbar-content>
     

      <nav-body>
         
        <nav-manage-list #kitchenSideNav [opened]="media.query('gt-sm')" [mode]="(media.query('gt-sm')) ? 'side' : 'push'" [sidenavWidth]="(media.query('gt-xs')) ? '250px' : '100%'">
      
          <nav-toolbar-content>
            <span>Kitchen Sink</span>
            <span fxFlex></span>      
        </nav-toolbar-content>

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

          <nav-body>
            <router-outlet></router-outlet>
          </nav-body>

        </nav-manage-list>

      </nav-body>
    </nav-content> 

</nav-layout>
```
