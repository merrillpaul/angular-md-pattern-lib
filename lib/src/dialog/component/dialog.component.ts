import { Component, ViewContainerRef, OnInit } from '@angular/core';

import { MatDialogRef } from '@angular/material';

import { DialogOptions } from './dialog.options';
import { DialogType } from './dialog.type';

@Component({
    selector: 'psn-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss' ]
})

export class DialogComponent implements OnInit {
    public dialogData: DialogOptions;
    public dialogType: DialogType;
    public dialogTypeClass: string;
    public primaryButtonClass: string


    constructor(
        private _dialogRef: MatDialogRef<DialogComponent>,
        private vc: ViewContainerRef
    ) { }



    ngOnInit(): void {
        let containers = this.getParentsUntil(this.vc.element.nativeElement, 'mat-dialog-container');
        let matDlgContainer: any = containers[containers.length - 1];
        this.dialogTypeClass = DialogType[this.dialogType].toLowerCase()
        matDlgContainer.classList += ' psn-dialog dlg-type-' + this.dialogTypeClass;

        this.prepareDialogOptions();
    }

    private prepareDialogOptions() {
        this.dialogData.hideCancel = !!this.dialogData.hideCancel;
        this.dialogData.cancelButtonLabel = this.dialogData.cancelButtonLabel || 'Cancel';
        this.dialogData.okButtonLabel = this.dialogData.okButtonLabel || 'Ok';

        switch(this.dialogType) {
            case DialogType.INFO:
                this.primaryButtonClass = 'primary'; break;
            case DialogType.SUCCESS:
                this.primaryButtonClass = 'success'; break;
            case DialogType.WARNING:
                this.primaryButtonClass = 'accent'; break; // materials warning is accent
            case DialogType.ERROR:
                this.primaryButtonClass = 'warn'; break;
        }
    }

    public get primaryClass() {
        return this.primaryButtonClass;
    }

    cancel() {
        this._dialogRef.close('cancel');
    }

    ok() {
        this._dialogRef.close('ok');
    }

    /**
     * Get all of an element's parent elements up the DOM tree until a matching parent is found
     * @param  elem     The element
     * @param  parent   The selector for the parent to stop at
     * @param  selector The selector to filter against [optionals]
     * @return The parent elements
     */
    private getParentsUntil(elem: any, parent: string, selector: string = undefined) {

        // Element.matches() polyfill
        if (!Element.prototype.matches) {
            Element.prototype.matches =
                Element.prototype['matchesSelector'] ||
                Element.prototype['mozMatchesSelector'] ||
                Element.prototype['msMatchesSelector'] ||
                Element.prototype['oMatchesSelector'] ||
                Element.prototype['webkitMatchesSelector'] ||
                function (s) {
                    let matches = (this.document || this.ownerDocument).querySelectorAll(s),
                        i = matches.length;
                    while (--i >= 0 && matches.item(i) !== this) { }
                    return i > -1;
                };
        }

        // Setup parents array
        let parents = [];

        // Get matching parent elements
        for (; elem && elem !== document; elem = elem.parentElement) {

            if (parent) {
                if (elem.matches(parent)) {
                    parents.push(elem);
                    break;
                }
            }

            if (selector) {
                if (elem.matches(selector)) {
                    parents.push(elem);
                }
                break;
            }

            parents.push(elem);

        }
        return parents;
    }
}