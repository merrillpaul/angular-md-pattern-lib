import { ToastOptions } from 'ng2-toastr';

export class DefaultToastOptions extends ToastOptions {
    newestOnTop = true;
    showCloseButton = true;
    positionClass = "toast-top-full-width";
    animate = "fade";
    enableHTML = true;
    toastLife = 30000;
}