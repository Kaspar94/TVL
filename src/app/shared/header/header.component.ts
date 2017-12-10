import {Component, AfterViewInit, Input, ViewChild, ElementRef} from '@angular/core';
import {SharedService} from '../shared.service';
import {LoginComponent} from '../login/login.component';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {AlertService} from '../alert/alert.service';
import {TranslateService} from '@ngx-translate/core';

declare const $;
@Component({
  selector: 'header-shared',
  templateUrl: 'header.component.html',
  styleUrls: ['./header.css', '../../app.component.css']
})
export class CustomerSideHeaderComponent{

  @Input() title: string;
  modalOption: NgbModalOptions = {};

  constructor(public sharedService: SharedService,
              private modalService: NgbModal,
              public alertService: AlertService,
              private translateService: TranslateService) {
    this.modalOption.backdrop = 'static';
    this.modalOption.keyboard = false;
  }

  changeLang(lang: any) {
    const indx = this.sharedService.languages.findIndex( (x) => x.countryLetters === lang);
    this.sharedService.lang = this.sharedService.languages[indx];
    this.translateService.use(this.sharedService.lang.jsonLetters);
  }

  logout() {
    this.sharedService.loggedIn = false;
    this.sharedService.title = 'header.returnTitle';
    this.sharedService.username = null;
    this.sharedService.password = null;
  }

  openLogin() {
    const dialog = (<LoginComponent>this.modalService.open(LoginComponent, this.modalOption).componentInstance);
    this.sharedService.username = null;
    this.sharedService.password = null;
  }
}
