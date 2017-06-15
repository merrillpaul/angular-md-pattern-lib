
### Scroller
Provides scrolling using iScroll into the container.
The scroller height's default will be 200px

```html
<div psn-scroller containerHeight="250px|rem|em|vh" >
</div>
```

This can also listen for media, for example
```html
<div psn-scroller [containerHeight]="media.query('xs') ? '250px': '400px'">
 ...
</div>
``` 
You would need to inject `MediaQueryService` into your component.