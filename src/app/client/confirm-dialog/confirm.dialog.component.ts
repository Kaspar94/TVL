import {Component} from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {TranslateService} from '@ngx-translate/core';
import {SharedService} from '../../shared/shared.service';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm.dialog.component.html',
  styleUrls: ['../../app.component.css', '../../shared/header/header.css', '../client.css', '../../user-form/user-form.css']
})
export class ConfirmDialogComponent {

  private confirmCallback: () => any;
  title;
  message;

  constructor(translate: TranslateService,
              public activeModal: NgbActiveModal,
              private parentModalRef: NgbActiveModal,
              public sharedService: SharedService,
              private modalService: NgbModal) {
    this.parentModalRef = null;
  }

  close() {
    this.activeModal.dismiss();
  }

  validateLogin() {
    this.sharedService.login().subscribe((res) => {
      if (res.status === 'success') {
        this.sharedService.loggedIn = !this.sharedService.loggedIn;
        this.sharedService.title = 'header.adminTitle';
        this.close();
      }
    });
  }

  setConfirmCallbackMethod(callback: () => any): ConfirmDialogComponent {
    this.confirmCallback = callback;
    return this;
  }

  setTitle(title: string) {
    this.title = title;
  }

  setMessage(msg: string) {
    this.message = msg;
  }

  setParentModal(ref: NgbActiveModal) {
    this.parentModalRef = ref;
  }

  confirm(): any {
    this.activeModal.dismiss(true);
    if (this.parentModalRef) {
      this.parentModalRef.dismiss(true);
    }
    if (this.confirmCallback) {
      return this.confirmCallback();
    }
  }

  cancel(): any {
    this.activeModal.dismiss(true);
  }
}
