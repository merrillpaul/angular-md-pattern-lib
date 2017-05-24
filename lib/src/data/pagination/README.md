# psn-paginate



The `(change)` event throws an event with the following interface:

```typescript
export interface PageChangeEvent {
  page: number;
  maxPage: number;
  pageSize: number;
  total: number;
  fromRow: number;
  toRow: number;
}
```




## Usage


 ```html
<psn-paginate  #paginator 
color="not mandatory | primary | accent | default primary"
[showQuickPage]="true|false"
allOptionLabel="allText" [arrows]="true|false" [prevLabel]="prev" [nextLabel]="next" [firstLast]="true|false" [showAllOption]="true|false" [pageSizes]="[100,200,500,1000,2000]"
                       [initialPage]="1" [pageSize]="100" [total]="1345" (change)="change($event)">
  <span paginate-label hide-xs>Row per page:</span>
  Showing {{paginator.range}} <span hide-xs>of {{paginator.total}} entries</span>
</psn-paginate>
 ```