## Usage

```html
<psn-file-upload #fileUpload defaultColor="accent" activeColor="warn" cancelColor="primary" (select)="selectEvent($event)"
  (upload)="uploadEvent($event)" (cancel)="cancelEvent()" accept=".ext,.anotherExt" [disabled]="disabled" multiple>
  <mat-icon>file_upload</mat-icon><span>{{ fileUpload.files?.name }}</span>
  <ng-template psn-file-input-label>
    <mat-icon>attach_file</mat-icon><span>Choose a file...</span>
  </ng-template>
</psn-file-upload>
```
 
```typescript


  disabled: boolean = false;

  selectEvent(files: FileList | File): void {
    if (files instanceof FileList) {
      ...
    } else {
      ...
    }
  }

  uploadEvent(files: FileList | File): void {
    if (files instanceof FileList) {
      ...
    } else {
      ...
    }
  }

  cancelEvent(): void {
    ...
  }

```


### more examples
```html
<p>Select Event: {{fileSelectMsg}}</p>
<p>Upload Event: {{fileUploadMsg}}</p>
<psn-file-upload defaultColor="secondary" activeColor="success" #singleFileUpload (select)="selectEvent($event)" (upload)="uploadEvent($event)" (cancel)="cancelEvent()" [disabled]="disabled">
    <mat-icon>file_upload</mat-icon><span>{{ singleFileUpload.files?.name }}</span>
    <ng-template psn-file-input-label>
    <mat-icon>attach_file</mat-icon><span>Choose a file...</span>
    </ng-template>
</psn-file-upload>
```

```typescript

  fileSelectMsg: string = 'No file selected yet.';
  fileUploadMsg: string = 'No file uploaded yet.';
  disabled: boolean = false;

  selectEvent(file: File): void {
    this.fileSelectMsg = file.name;
  }

  uploadEvent(file: File): void {
    this.fileUploadMsg = file.name;
  }

  cancelEvent(): void {
    this.fileSelectMsg = 'No file selected yet.';
    this.fileUploadMsg = 'No file uploaded yet.';
  }
```

### multiple upload button
```html
 <p>Select Event: {{fileSelectMultipleMsg}}</p>
<p>Upload Event: {{fileUploadMultipleMsg}}</p>
<psn-file-upload #fileMultipleUpload (select)="selectMultipleEvent($event)" (upload)="uploadMultipleEvent($event)" (cancel)="cancelMultipleEvent()"
                accept=".sql" defaultColor="accent" activeColor="success" cancelColor="primary" multiple [disabled]="disabled">
    <mat-icon>file_upload</mat-icon>
    <span>
    {{ fileMultipleUpload.files?.name || fileMultipleUpload.files?.length }} <span *ngIf="fileMultipleUpload.files?.length">files selected</span>
    </span>
    <ng-template psn-file-input-label>
    <mat-icon>attach_file</mat-icon><span>Choose multiple .sql files...</span>
    </ng-template>
</psn-file-upload>
```

```typescript
fileSelectMultipleMsg: string = 'No file(s) selected yet.';
  fileUploadMultipleMsg: string = 'No file(s) uploaded yet.';

  selectMultipleEvent(files: FileList | File): void {
    if (files instanceof FileList) {
      let names: string[] = [];
      for (let i: number = 0; i < files.length; i++) {
        names.push(files[i].name);
      }
      this.fileSelectMultipleMsg = names.join(',');
    } else {
      this.fileSelectMultipleMsg = files.name;
    }
  }

  uploadMultipleEvent(files: FileList | File): void {
    if (files instanceof FileList) {
      let names: string[] = [];
      for (let i: number = 0; i < files.length; i++) {
        names.push(files[i].name);
      }
      this.fileUploadMultipleMsg = names.join(',');
    } else {
      this.fileUploadMultipleMsg = files.name;
    }
  }

  cancelMultipleEvent(): void {
    this.fileSelectMultipleMsg = 'No file(s) selected yet.';
    this.fileUploadMultipleMsg = 'No file(s) uploaded yet.';
  }
```