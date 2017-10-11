## nav-manage-list


 Manage List Layout:

```html
 <nav-manage-list #kitchenSideNav [opened]="media.query('gt-sm')" [mode]="(media.query('gt-sm')) ? 'side' : 'push'" [sidenavWidth]="(media.query('gt-xs')) ? '250px' : '100%'">
       <mat-nav-list sidenav-content>
        <ng-template spin="kitchen.side.load">
          <ng-template let-item let-last="last" ngFor [ngForOf]="items">
            <a mat-list-item [routerLink]="[item.route]" [routerLinkActive]="['active']" [routerLinkActiveOptions]="{exact:true}" (click)="!media.query('gt-sm') && kitchenSideNav.close()">
              <mat-icon mat-list-avatar>{{item.icon}}</mat-icon>
              <h3 mat-line> {{item.title}} </h3>
              <p mat-line> {{item.description}} </p>
            </a>
            <mat-divider *ngIf="!last" mat-inset></mat-divider>
          </ng-template>
        </ng-template>
      </mat-nav-list>

      <nav-body>
       <router-outlet></router-outlet>
      </nav-body>       

</nav-manage-list>
```

With Side toolbar
```html
<nav-manage-list #kitchenSideNav [opened]="media.query('gt-sm')" [mode]="(media.query('gt-sm')) ? 'side' : 'push'" [sidenavWidth]="(media.query('gt-xs')) ? '250px' : '100%'">
      <nav-toolbar-content>
          <button (click)="kitchenSideNav.toggle()" mat-icon-button><mat-icon class="mat-24">menu</mat-icon></button>
          <span fxFlex></span>
          <button mat-icon-button><mat-icon class="mat-24">view_module</mat-icon></button>
          <button mat-icon-button><mat-icon class="mat-24">sort</mat-icon></button>
          <button mat-icon-button><mat-icon class="mat-24">settings</mat-icon></button>
          <button mat-icon-button><mat-icon class="mat-24">more_vert</mat-icon></button>
      </nav-toolbar-content>

      <mat-nav-list sidenav-content>
        <ng-template spin="kitchen.side.load">
          <ng-template let-item let-last="last" ngFor [ngForOf]="items">
            <a mat-list-item [routerLink]="[item.route]" [routerLinkActive]="['active']" [routerLinkActiveOptions]="{exact:true}" (click)="!media.query('gt-sm') && kitchenSideNav.close()">
              <mat-icon mat-list-avatar>{{item.icon}}</mat-icon>
              <h3 mat-line> {{item.title}} </h3>
              <p mat-line> {{item.description}} </p>
            </a>
            <mat-divider *ngIf="!last" mat-inset></mat-divider>
          </ng-template>
        </ng-template>
      </mat-nav-list>

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
        <button (click)="kitchenSideNav.toggle()" mat-icon-button><mat-icon class="mat-24">menu</mat-icon></button>
        <span fxFlex></span>
        <button mat-icon-button><mat-icon class="mat-24">view_module</mat-icon></button>
        <button mat-icon-button><mat-icon class="mat-24">sort</mat-icon></button>
        <button mat-icon-button><mat-icon class="mat-24">settings</mat-icon></button>
        <button mat-icon-button><mat-icon class="mat-24">more_vert</mat-icon></button>
      </nav-toolbar-content>
     

      <nav-body>
         
        <nav-manage-list #kitchenSideNav [opened]="media.query('gt-sm')" [mode]="(media.query('gt-sm')) ? 'side' : 'push'" [sidenavWidth]="(media.query('gt-xs')) ? '250px' : '100%'">
      
          <nav-toolbar-content>
            <span>Kitchen Sink</span>
            <span fxFlex></span>      
        </nav-toolbar-content>

          <mat-nav-list sidenav-content>
            <ng-template spin="kitchen.side.load">
              <ng-template let-item let-last="last" ngFor [ngForOf]="items">
                <a mat-list-item [routerLink]="[item.route]" [routerLinkActive]="['active']" [routerLinkActiveOptions]="{exact:true}" (click)="!media.query('gt-sm') && kitchenSideNav.close()">
                  <mat-icon mat-list-avatar>{{item.icon}}</mat-icon>
                  <h3 mat-line> {{item.title}} </h3>
                  <p mat-line> {{item.description}} </p>
                </a>
                <mat-divider *ngIf="!last" mat-inset></mat-divider>
              </ng-template>
            </ng-template>
          </mat-nav-list>

          <nav-body>
            <router-outlet></router-outlet>
          </nav-body>

        </nav-manage-list>

      </nav-body>
    </nav-content> 

</nav-layout>
```
