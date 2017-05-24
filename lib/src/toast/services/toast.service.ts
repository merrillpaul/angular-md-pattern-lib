import { Injectable, ViewContainerRef } from '@angular/core';
import { ToastsManager, Toast } from 'ng2-toastr/ng2-toastr';


import { ToastRequest } from '../toast.request';
import { ToastDismissMode } from '../toast.mode'

@Injectable()
export class ToastService {
    constructor(private toastr: ToastsManager) {
        this.toastr.onClickToast().subscribe((toast: Toast) => {
            let data: any = toast.data;
            if (data && data.onTouch) {
                data.onTouch(toast);
            }
        });
    }

    setup(vcr: ViewContainerRef) {
        this.toastr.setRootViewContainerRef(vcr);
    }

    success(request: ToastRequest): Promise<Toast> {
        let options = this._buildOptions(request);
        return this.toastr.success(request.message, request.title, options);
    }

    info(request: ToastRequest): Promise<Toast> {
        let options = this._buildOptions(request);
        return this.toastr.info(request.message, request.title, options);
    }

    warning(request: ToastRequest): Promise<Toast> {
        let options = this._buildOptions(request);
        return this.toastr.warning(request.message, request.title, options);
    }

    error(request: ToastRequest): Promise<Toast> {
        let options = this._buildOptions(request);
        return this.toastr.error(request.message, request.title, options);
    }

    dismissToast(toast: Toast) {
        this.toastr.dismissToast(toast);
    }

    private _buildOptions(request: ToastRequest): any {
        let options: any = {
            data: {}
        };
        if (request.dismissMode === ToastDismissMode.CONTROLLED) {
            options.dismiss = 'controlled';
        } else {

            switch (request.dismissMode) {
                case ToastDismissMode.AUTO:
                    options.toastLife = request.toastLife;
                    options.dismiss = 'auto';
                    break;
                case ToastDismissMode.CLICK:
                    options.dismiss = 'click';
                    break;
            }
        }

        if (request.onTouch) {
            options.data.onTouch = request.onTouch;
        }
        return options;
    }
}