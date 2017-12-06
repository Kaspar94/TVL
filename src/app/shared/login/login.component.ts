import {Component} from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {TranslateService} from '@ngx-translate/core';
import {SharedService} from '../../shared/shared.service';
import {AlertService} from '../alert/alert.service';
import { error } from 'selenium-webdriver';

@Component({
  selector: 'login-component',
  templateUrl: './login.component.html',
  styleUrls: ['../../app.component.css', '../header/header.css']
})
export class LoginComponent {

  constructor(translate: TranslateService,
              public activeModal: NgbActiveModal,
              public sharedService: SharedService,
              private modalService: NgbModal,
              private alertService: AlertService,
              private translateService: TranslateService) {
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
    },
      (error) => {
        this.alertService.error(this.translateService.instant('error.invalidLogin'), this.translateService.instant('error.failed'));
    });
  }
}
