import { Component, OnInit } from '@angular/core';

import { MdSnackBar, MdDialog } from '@angular/material';
import { DialogService, ToastService } from '@pearson/angular-material'
import { DialogOptions, DialogType, ToastRequest, ToastDismissMode } from '@pearson/angular-material';
import { Toast } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-dialog-example',
  templateUrl: './dialog.example.component.html',
  styleUrls: ['./dialog.example.component.scss']
})
export class DialogExampleComponent implements OnInit {

  selectedOption;
  controlledToast: Toast;

  constructor(
    private _dialogService: DialogService,
    private _toastService: ToastService,
    private _snackBarService: MdSnackBar
  ) { }

  ngOnInit() {

  }

  showSnackbar() {
    this._snackBarService.open('Message', 'Action', { duration: 3000 });
  }

  openPrimary(): void {
    this._dialogService.info({
      title: 'Logout',
      message: 'Are you sure you want to logout?'
    }, {
        //width: '50%',

      }).subscribe(res => this.selectedOption = res);
  }

  openSuccess(): void {
    this._dialogService.success({
      title: 'Yay',
      message: 'You are successful!'
    }, {
        //width: '50%',

      }).subscribe(res => this.selectedOption = res);
  }

  openWarning(): void {
    this._dialogService.warning({
      title: 'Hmm?',
      subtitle: 'Are you serious?',
      message: 'Be cautious!'
    }, {
        //width: '50%',

      }).subscribe(res => this.selectedOption = res);
  }

  openDanger(): void {
    this._dialogService.error({
      title: 'Oops?',
      message: 'Yikes !',
      okButtonLabel: 'Oopsie'
    }, {
        //width: '50%',

      }).subscribe(res => this.selectedOption = res);
  }

  openAlert(): void {
    this._dialogService.info({
      title: 'Sure?',
      message: 'Please press here to continue !',
      hideCancel: true
    }, {
        width: '50%',

      }).subscribe(res => this.selectedOption = res);
  }

  openSuccessToast() {
    let request = new ToastRequest('Yay!', 'You have done an awesome job');
    this._toastService.success(request);
  }

  openInfoToast() {
    let request = new ToastRequest('Alright!', 'You should be happy for yourself');
    this._toastService.info(request);
  }

  openWarningToast() {
    let request = new ToastRequest('Caution!', 'A word I do not recognize');
    this._toastService.warning(request);
  }

  openErrorToast() {
    let request = new ToastRequest('Yikes!', 'Your bad');
    this._toastService.error(request);
  }

  openToastForClick() {
    let request = new ToastRequest(
      '', 'This will go away only if you click/touch  on it', ToastDismissMode.CLICK);
    this._toastService.info(request);
  }

  openToastForControl() {
    let request = new ToastRequest(
      '', 'This will be close only when you click/touch the button next to the one that created this'
      , ToastDismissMode.CONTROLLED);
    this._toastService.warning(request).then((toast: Toast) => {
      this.controlledToast = toast;
    });
  }

  closeControlledToast() {
    if (this.controlledToast) {
      this._toastService.dismissToast(this.controlledToast);
      this.controlledToast = null;
    }
  }

  openToastWithHtml() {
    let request = new ToastRequest('Alright!', `
    <span style="color: red">Message in red inside blue ?</span>
   `);
    this._toastService.info(request);
  }


  openToastAndHandleClick() {
    let request = new ToastRequest('Winner!', 'Click here to claim your prize. This is not a SPAM ;-)');    
    request.onTouch = (toast) => {
      let request1 = new ToastRequest('Boo!', 'Got you, no prize amigo !');
      this._toastService.error(request1); 
      this._toastService.dismissToast(toast);
    };
    this._toastService.info(request);
  }

}
