import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from './alert-modal/alert-modal.component';

import { Location } from '@angular/common';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { take } from 'rxjs';

export enum AlertTypes {
  DANGER = 'danger',
  SUCCESS = 'success'
}

@Injectable({
  providedIn: 'root'
})
export class AlertModalService {

  constructor(
    private modalService: BsModalService,
    private location: Location
  ) { }

  showAlert(message: string, type: AlertTypes, dismissTimeout?: number, locationBack?: boolean) {
    const bsModalRef: BsModalRef = this.modalService.show(AlertModalComponent);
    bsModalRef.content.type = type;
    bsModalRef.content.message = message;

    if (dismissTimeout) {
      setTimeout(() => bsModalRef.hide(), dismissTimeout);
    }

    if (locationBack) {
      setTimeout(() => this.location.back(), dismissTimeout);
    }

  }

  showAlertDanger(message: string, dismissTimeout?: number, locationBack?: boolean) {
    this.showAlert(message, AlertTypes.DANGER);
  }

  showAlertSuccess(message: string, dismissTimeout?: number, locationBack?: boolean) {
    const timeout = dismissTimeout ? dismissTimeout :  3000;
    const back = locationBack ? locationBack : true;
    this.showAlert(message, AlertTypes.SUCCESS, timeout, back);
  }

  showConfirm(title: string, message: string, okTxt?: string, cancelTxt?: string) {
    const bsModalRef: BsModalRef = this.modalService.show(ConfirmModalComponent);
    bsModalRef.content.title = title;
    bsModalRef.content.message = message;

    if (okTxt) {
      bsModalRef.content.okTxt = okTxt;
    }

    if (cancelTxt) {
      bsModalRef.content.cancelTxt = cancelTxt;
    }

    return (<ConfirmModalComponent>bsModalRef.content).confirmResult;
  }


  //.confirmResult;
}
