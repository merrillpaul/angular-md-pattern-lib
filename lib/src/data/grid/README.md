## Usage

 ```html
<psn-data-grid
  [data]="data"
  [columns]="columns"
  [selectable]="true|false"
  [multiple]="true|false"
  [sortable]="true|false"
  [sortBy]="sortBy"
  [sortOrder]="'ASC'|'DESC'"
  (sortChange)="sortEvent($event)"
  (rowSelect)="selectEvent($event)"
  (selectAll)="selectAllEvent($event)"> 
</psn-data-grid>
 ```

### Other attr
- selectOnClick true|false default true to select a row on click of row instead of checkbox

 ### with custom column markup

 ```html
<psn-data-grid
  [data]="data"
  [columns]="columns"
  [selectable]="true|false"
  [multiple]="true|false"
  [sortable]="true|false"
  [sortBy]="sortBy"
  [sortOrder]="'ASC'|'DESC'"
  (sortChange)="sortEvent($event)"
  (rowSelect)="selectEvent($event)"
  (selectAll)="selectAllEvent($event)"> 
   <ng-template psnGridColumnTemplate="someColumnName" let-value="value" let-row="row" let-column="column">
    <div fxLayout="row">
      <span fsFlex>{{value}}</span>  or <span fxFlex>{{row[column]}}</span>
      <md-icon>star</md-icon>
    </div>
  </ng-template>
</psn-data-grid>
 ```


 ### TS

 ```typescript
 columns: GridColumnMetadata[] = [
    { name: 'name',  label: 'Subtest', sortable: true, editable: true },
    { name: 'guid', label: 'GUID', filter: true },
    { name: 'displayName', label: 'DisplayName', format: any_formater_method, sortable: true, hidden: false },
    { name: 'subtestCategory', label: 'Subtest Category', editable: true, editor: {
            type: EditorType.LIST,
            items: [
                {
                    value: '1',
                    label: "Speech"
                }
            ]
    }},
    { name: 'created', label: 'Created Date', format: some_DATE_FORMAT_method, editable: true, editor: {type: EditorType.DATE} }   
  ];


  data: any[] = [
      {
          "name": "WIAT3",
          "guid": "gYTUYGUYTQJGUG",
          "displayName": "Wiat - III ",
          "subtestCategory": "1"
      },
      {
          ..
      }
  ]
 ```
