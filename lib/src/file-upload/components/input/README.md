## Usage

```html
<psn-file-input [(ngModel)]="files" color="primary" (select)="selectEvent($event)"
               accept=".ext,.anotherExt" [disabled]="disabled" multiple>
  <mat-icon>attach_file</mat-icon><span>Choose a file...</span>
</psn-file-input>
```
 
```typescript

  files: File | FileList;
  disabled: boolean = false;

  selectEvent(files: FileList | File): void {
    if (files instanceof FileList) {
      ...
    } else {
      ...
    }
  };

```

or

```html
<input type="file" psnFileSelect (fileSelect)="files = $event" multiple>
```
or 

```html
<div psnFileDrop (fileDrop)="files = $event" multiple [disabled]="disabled">
</div> 
```

or an entire markup
```html
 <div fxLayout="row">
    <mat-input-container psnFileDrop
                        [disabled]="disabled"
                        (fileDrop)="files = $event"
                        (click)="fileInput1.inputElement.click()"
                        (keyup.enter)="fileInput1.inputElement.click()"
                        (keyup.delete)="fileInput1.clear()"
                        (keyup.backspace)="fileInput1.clear()"
                        fxFlex="50%">
        <input mdInput
            placeholder="select or drop files"
            [value]="files?.length ? (files?.length + ' files') : files?.name"
            [disabled]="disabled"
            readonly/>
    </mat-input-container>
    <button mat-icon-button *ngIf="files" (click)="fileInput1.clear()" (keyup.enter)="fileInput1.clear()">
        <mat-icon>cancel</mat-icon>
    </button>
    <psn-file-input class="push-left-sm push-right-sm" #fileInput1 [(ngModel)]="files" multiple>
        <mat-icon>folder</mat-icon>
        <span class="text-upper">Browse...</span>
    </psn-file-input>
    <span>
        <button mat-raised-button color="success" [disabled]="!files" class="text-upper">Submit</button>
    </span>
 </div>   
```
