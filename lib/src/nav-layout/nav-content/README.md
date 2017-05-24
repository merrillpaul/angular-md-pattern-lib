## nav-content

`<nav-content>` is a layout component which can add a view with toolbar items and footers.


## Usage
Example for Nav Content:

```html
<nav-content [root]="true|false" [hideToolBar]="true|*false" [hideMenu]="true|false" toolbarTitle="title" logo="logo" icon="icon" color="color" navigationRoute="/">
  <div toolbar-content>
    .. any toolbars
  </div>
  ... main content
  <nav-footer>
    ... main footer content
  </nav-footer>
</<nav-content>
```
