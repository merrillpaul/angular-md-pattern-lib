## Usage

 ```html
 <psn-data-grid
          #dataTable
          [data]="data"
          [columns]="columns"
          [selectable]="true"
          [clickable]="true"
          [multiple]="true"   
          [(ngModel)]="selectedRows"          
          (sortChange)="sort($event)" 
          (rowClick)="handleRowClick($event)"  
          (cellClick)="handleCellClick($event)"  
          (dataAdded)="onDataAdded($event)"          
          >
        </psn-data-grid>
 ```

### Other attr
- selectOnClick true|false default true to select a row on click of row instead of checkbox
### events
- (sortChange)
- (rowClick)
- (cellClick)
- (dataAdded)
- (dataRemoved)
   
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


## With Custom COlumn Elements

```html
         [columns]="columns2"
          [selectable]="false"
          [clickable]="false"
          >
            <ng-template psnGridColumnTemplate="createdDate" let-value="value" let-row="row" let-column="column" let-rowIndex="rowIndex">
          
                <md-input-container>
                    <input mdInput [mdDatepicker]="picker" placeholder="Choose a date {{rowIndex}}">
                    <button mdSuffix [mdDatepickerToggle]="picker"></button>
                </md-input-container>
                <md-datepicker #picker></md-datepicker>
            
        </ng-template>

        <ng-template psnGridColumnTemplate="actions" let-value="value" let-row="row" let-column="column" let-rowIndex="rowIndex">
            <div fxLayout="row" fxLayoutAlign="start center" fxLayoutGap="5px">
                 <button (click)="alert(row, rowIndex)" md-raised-button color="accent" >Save</button>
                 <button md-raised-button color="warn" [mdMenuTriggerFor]="menu">Delete</button>
                    <button md-icon-button [mdMenuTriggerFor]="menu">
                    <md-icon>more_vert</md-icon>
                    </button>
                    <md-menu #menu="mdMenu">
                        <button md-menu-item> Refresh </button>
                        <button md-menu-item> Settings </button>
                        <button md-menu-item> Help </button>
                        <button md-menu-item disabled> Sign Out </button>
                    </md-menu>
            </div>
        </ng-template>


         <ng-template psnGridColumnTemplate="guid" let-value="value" let-row="row" let-column="column" let-rowIndex="rowIndex">
            <div fxLayout="row" fxLayoutAlign="start center" >
                <md-input-container fxFlex>
                    <input mdInput placeholder="Guid" value="{{row[column]}}">
                </md-input-container>
            </div>
        </ng-template>
        </psn-data-grid>
```

```typescript
 columns1: GridColumnMetadata[] = [
        {
            name: "name",
            label: "Subtest Name"            
        },
        {
            name: "guid",
            label: "Guid"
        },
        {
            name: 'createdDate',
            label: "Created Date"
            
        },
        {
            name: 'price',
            label: "Price"           
        },
        {
            name: 'category',
            label: "Category"
           
        },
         {
            name: "actions",
            label: "Actions"            
        }
    ];
```


## Grids with fixed height 
Grids with fixed height get the locked column headers
html
 
 - Make sure you add the scripts in your ng app  in .angular-cli.jsno as shown below
 ```json
 "scripts": [
        "../node_modules/iscroll/build/iscroll.js"
      ],
 ```     
This is because for some reason iscroll is not a proper webpackable module

 ```html
<psn-data-grid
   gridHeight="300px|rem|em|vh"
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
