import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'file-example',
    templateUrl: 'file.example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class FileExampleComponent {

    files: any;
    disabled: boolean = false;

    fileSelectMsg: string = 'No file selected yet.';
    fileUploadMsg: string = 'No file uploaded yet.';
    fileSelectMultipleMsg: string = 'No file(s) selected yet.';
    fileUploadMultipleMsg: string = 'No file(s) uploaded yet.';

    constructor(private _changeDetectorRef: ChangeDetectorRef) { }

    toggleDisabled(): void {
        this.disabled = !this.disabled;
        this._changeDetectorRef.detectChanges();
        this._changeDetectorRef.markForCheck();
    }


    cancelEvent(): void {
        this.fileSelectMsg = 'No file selected yet.';
        this.fileUploadMsg = 'No file uploaded yet.';
    }

    selectEvent(file: File): void {
        this.fileSelectMsg = file.name;
    }

    uploadEvent(file: File): void {
        this.fileUploadMsg = file.name;
    }

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
}