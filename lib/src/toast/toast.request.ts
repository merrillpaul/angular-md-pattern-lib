import { ToastDismissMode } from './toast.mode';

import { Observable } from 'rxjs/Rx';

export class ToastRequest {
    title: string = '';
    message: string = '';
    dismissMode: ToastDismissMode = ToastDismissMode.AUTO;
    toastLife: number = 5000;
    onTouch: Function;
   
    constructor(title: string, message: string, dismissMode: ToastDismissMode = ToastDismissMode.AUTO,
        toastLife: number = 5000) {
            this.title = title;
            this.message = message;
            this.dismissMode = dismissMode;
            this.toastLife = toastLife;            
    }
    
}