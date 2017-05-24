## nav-manage-list


 Manage List Layout / Nav Layout combo:

```html
<nav-content sidenavTitle="title" logo="logo" icon="icon" color="color">
  <nav-toolbar-content>
    .. main toolbar content
  </nav-toolbar-content>

  <nav-manage-list opened="true" mode="side" sidenavWidth="257px">
    <md-toolbar sidenav-content>
      ... toolbar in sidenav
    </md-toolbar>
    <md-nav-list sidenav-content>
      ... sidenav content
    </md-nav-list>
    <div toolbar-content>
      ... sub toolbar content
    </div>
    ... main content
    <nav-footer-inner>
      ... sub footer content
    </nav-footer-inner>
  </nav-manage-list>
  <nav-footer>
    ... main footer content
  </nav-footer>
</nav-content>
```
