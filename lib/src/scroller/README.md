
### Scroller
Provides scrolling using iScroll into the container.
The scroller height's default will be the parents calculated height (offsetHeight)

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

## Use Browser scrolling 
```
<div class="test-session-ctr" psn-scroller [browserScroll]="!media.query('gt-xs')">
            <router-outlet></router-outlet>
        </div>      
```
Here, we fallback to typical browser scroller for smaller xs media.

- You would need to inject `MediaQueryService` into your component.