import { Type } from '@angular/core';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule, JsonpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { MdIconModule, MdButtonModule, PortalModule } from '@angular/material';

import { FlexLayoutModule } from '@angular/flex-layout';

import { FileInputComponent, FileInputLabelDirective } from './components/input/input.component';
import { FileUploadComponent } from './components/upload/upload.component';
import { FileSelectDirective } from './directives/file.select';
import { FileDropDirective } from './directives/file.drop';
import { FileService } from './services/file.service';

export { FileInputComponent, FileInputLabelDirective } from './components/input/input.component';
export { FileUploadComponent } from './components/upload/upload.component';
export { FileSelectDirective } from './directives/file.select';
export { FileDropDirective } from './directives/file.drop';
export { FileService, UploadOptions } from './services/file.service';

@NgModule({
    imports: [
        HttpModule,
        JsonpModule,
        FormsModule,
        CommonModule,
        MdIconModule,
        MdButtonModule,
        PortalModule,
        FlexLayoutModule
    ],
    exports: [
        FileInputComponent,
        FileInputLabelDirective,
        FileUploadComponent,
        FileDropDirective,
        FileSelectDirective
    ],
    declarations: [
        FileInputComponent,
        FileInputLabelDirective,
        FileUploadComponent,
        FileDropDirective,
        FileSelectDirective
    ],
    providers: [
        FileService
    ],
})
export class PearsonFileUploadModule { }
