import { NgModule } from '@angular/core';
import { ToastModule, ToastOptions } from 'ng2-toastr/ng2-toastr';

import { ToastDismissMode } from './toast.mode';
import { DefaultToastOptions } from './toast.options';
import { ToastRequest } from './toast.request';
import { ToastService } from './services/toast.service';

export { ToastDismissMode, ToastRequest, ToastService };
export { Toast, ToastOptions } from 'ng2-toastr/ng2-toastr';

@NgModule({
    imports: [
        ToastModule.forRoot()
    ],
    exports: [
        ToastModule
    ],    
    providers: [
        ToastService,
        { provide: ToastOptions, useClass: DefaultToastOptions }
    ],
})
export class PearsonToastModule { }
