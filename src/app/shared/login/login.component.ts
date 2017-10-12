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


  username: any;
  password: any;

  constructor(translate: TranslateService,
              public activeModal: NgbActiveModal,
              public sharedService: SharedService,
              private modalService: NgbModal) {
  }

  close() {
    this.activeModal.dismiss();
  }

  validateLogin() {
    // TODO: Back-End'iga valideerida
    if (this.username === 'admin' && this.password === 'admin' && !this.sharedService.loggedIn) {
      this.sharedService.loggedIn = !this.sharedService.loggedIn;
      this.sharedService.title = 'header.adminTitle';
      this.close();
    }
  }
}
