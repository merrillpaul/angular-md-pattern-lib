import { Directive, Input, Output, EventEmitter } from '@angular/core';
import { HostListener, HostBinding, Host, Optional } from '@angular/core';
import { NgModel } from '@angular/forms';

@Directive({
  selector: '[psnFileSelect]',
})
export class FileSelectDirective {

  private _multiple: boolean = false;

  /**
   * multiple?: boolean
   * Sets whether multiple files can be selected at once in host element, or just a single file.
   * Can also be 'multiple' native attribute.
   */
  @Input('multiple')
  set multiple(multiple: string | boolean) {
    this._multiple = multiple !== '' ? (multiple === 'true' || multiple === true) : true;
  }

  /**
   * fileSelect?: function
   * Event emitted when a file or files are selected in host [HTMLInputElement].
   * Emits a [FileList | File] object.
   * Alternative to not use [(ngModel)].
   */
  @Output('fileSelect') onFileSelect: EventEmitter<FileList | File> = new EventEmitter<FileList | File>();

  /**
   * Binds native 'multiple' attribute if [multiple] property is 'true'.
   */
  @HostBinding('attr.multiple')
  get multipleBinding(): string {
    return this._multiple ? '' : undefined;
  }

  constructor(@Optional() @Host() private model: NgModel) {
  }

  /**
   * Listens to 'change' host event to get [HTMLInputElement] files.
   * Emits the 'onFileSelect' event with a [FileList] or [File] depending if 'multiple' attr exists in host.
   * Uses [(ngModel)] if declared, instead of emitting 'onFileSelect' event.
   */
  @HostListener('change', ['$event'])
  onChange(event: Event): void {
    if (event.target instanceof HTMLInputElement) {
      let fileInputEl: HTMLInputElement = (<HTMLInputElement>event.target);
      let files: FileList = fileInputEl.files;
      if (files.length) {
        let value: FileList | File = this._multiple ? (files.length > 1 ? files : files[0]) : files[0];
        this.model ? this.model.update.emit(value) : this.onFileSelect.emit(value);
      }
    }
  }
}
