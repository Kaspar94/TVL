import {Component} from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {TranslateService} from "@ngx-translate/core";
import {SharedService} from "../../shared/shared.service";

@Component({
  selector: 'login-component',
  templateUrl: './login.component.html',
  styleUrls: ['../../app.component.css', '../header/header.css']
})
export class LoginComponent {

  constructor(translate: TranslateService,
              public activeModal: NgbActiveModal,
              public sharedService: SharedService,
              private modalService: NgbModal) {
  }

  close() {
    this.activeModal.dismiss();
  }

  validateLogin() {
    if (this.isValid()) {
      this.sharedService.loggedIn = !this.sharedService.loggedIn;
      this.sharedService.title = 'header.adminTitle';
      this.close();
    }
  }

  isValid() {
    this.sharedService.login().subscribe((res) => {
      return res.status === 'success';
    });
    return false;
  }
}
