import { Component, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss']
})
export class AlertModalComponent {

  @Input() type: string = 'success';
  @Input() message: string = '';

  constructor(public bsModalRef: BsModalRef) {}

  onClose() {
    this.bsModalRef.hide();
  }
}
