import {Component, OnInit} from '@angular/core';
import {BusinessClient, FormInfo} from '../shared/shared.model';
import {SharedService} from '../shared/shared.service';
import {AlertService} from '../shared/alert/alert.service';
import {TranslateService} from '@ngx-translate/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import {ClientService} from '../client/client.service';
import { isNullOrUndefined } from 'util';
const XRegExp = require('xregexp');

@Component({
  selector: 'user-form',
  templateUrl: 'user-form.component.html',
  styleUrls: ['./user-form.css', '../app.component.css']
})
export class UserFormComponent implements OnInit {
  filteredCompanies: BusinessClient[];
  filteredCompaniesString: string[];
  recipient: any;
  chosenCompany: BusinessClient;

  constructor(public sharedService: SharedService,
              public clientService: ClientService,
              private alertService: AlertService,
              private translateService: TranslateService) {
    this.filteredCompanies = [];
    this.sharedService.loadWareHouseCountries();
    if (this.sharedService.deliveryCountry.length !== 0) {
      this.changeActiveCountry(this.sharedService.deliveryCountry);
    }
  }


  ngOnInit(): void {
  }

  changeActiveCompany(id: number) {
    const indx = this.filteredCompanies.findIndex((x) => x.id === id);
    this.recipient = this.filteredCompanies[indx].name;
    this.chosenCompany = this.filteredCompanies[indx];
  }

  changeActiveCountry(country: any) {
    this.sharedService.deliveryCountry = country;
    this.sharedService.filterDeliveryCountry(country).subscribe((res) => {
      this.filteredCompanies = [];
      this.filteredCompaniesString = [];
      res.json().forEach((x) => {
        this.filteredCompanies.push(x);
        this.filteredCompaniesString.push(x.name);
      });
      this.recipient = null;
    });
  }

  validate() {
    
    if (isNullOrUndefined(this.sharedService.deliveryCountry)) {
        this.alertService.error(this.translateService.instant('error.deliveryCountryNotChosen'),
          this.translateService.instant('error.failed'));
    } else if (isNullOrUndefined(this.recipient)) {
      this.alertService.error(this.translateService.instant('error.recipientNotChosen'),
          this.translateService.instant('error.failed'));
    } else if ((!isNullOrUndefined(this.chosenCompany)
        && this.chosenCompany.name !== this.recipient) || isNullOrUndefined(this.chosenCompany)) {
        const indx = this.filteredCompanies.findIndex((x) => x.name === this.recipient);
        if (indx > -1) {
            this.chosenCompany = this.filteredCompanies[indx];
        } else {
          this.alertService.error(this.translateService.instant('error.doesNotExist'), this.translateService.instant('error.failed'));
        }
    } else if (isNullOrUndefined(this.sharedService.formInfo.name)) {
        this.alertService.error(this.translateService.instant('error.noName'), this.translateService.instant('error.failed'));
    } else if (!this.validateName()) {
        this.alertService.error(this.translateService.instant('error.invalidName'), this.translateService.instant('error.failed'));
    } else if (isNullOrUndefined(this.sharedService.formInfo.email) && isNullOrUndefined(this.sharedService.formInfo.mobile)) {
        this.alertService.error(this.translateService.instant('error.atleastOne'), this.translateService.instant('error.failed'));
    } else if (this.validateName() && (this.validateEmail() || this.validateNumber()) && !isNullOrUndefined(this.chosenCompany)) {
      const indx = this.filteredCompanies.findIndex((x) => x.name === this.recipient);
      if (indx > -1) {
          this.chosenCompany = this.filteredCompanies[indx];
          const body = {
            business_id: this.chosenCompany.id,
            client_name: this.sharedService.formInfo.name,
            client_email: isNullOrUndefined(this.sharedService.formInfo.email) ? null : this.sharedService.formInfo.email,
            client_number: isNullOrUndefined(this.sharedService.formInfo.mobile) ? null : this.trimWhitespace(this.sharedService.formInfo.mobile)
          };
          this.sharedService.sendReturnInformation(body);
      } else {
        this.alertService.error(this.translateService.instant('error.doesNotExist'), this.translateService.instant('error.failed'));
      }
    } else if ((isNullOrUndefined(this.sharedService.formInfo.email) || this.sharedService.formInfo.email === '') && !isNullOrUndefined(this.sharedService.formInfo.mobile)) {
        if (!this.validateNumber()) {
            this.alertService.error(this.translateService.instant('error.invalidNumber'), this.translateService.instant('error.failed'));
        }
    } else if (!isNullOrUndefined(this.sharedService.formInfo.email) && (isNullOrUndefined(this.sharedService.formInfo.mobile) || this.sharedService.formInfo.mobile === '')) {
        if (!this.validateEmail()) {
          this.alertService.error(this.translateService.instant('error.invalidEmail'), this.translateService.instant('error.failed'));
        }
    } else if (!isNullOrUndefined(this.sharedService.formInfo.email) && !isNullOrUndefined(this.sharedService.formInfo.mobile)) {
        if (!this.validateEmail()) {
          this.alertService.error(this.translateService.instant('error.invalidEmail'), this.translateService.instant('error.failed'));
        }
        if (!this.validateNumber()) {
          this.alertService.error(this.translateService.instant('error.invalidNumber'), this.translateService.instant('error.failed'));
        }
    }

  }

  validateNumber() {
    if (!isNullOrUndefined(this.sharedService.formInfo.mobile)) {
      // Validaatorid on tehtud Omniva juhendi järgi mobiilinumbrite valideerimise osas. Viide -> https://www.omniva.ee/public/files/failid/manual_xml_dataexchange_eng.pdf -> lk. 7
      const est = /^(\+)?(372)?(5\d{6,7}|8\d{7})$/;
      const lv = /^(\+)?(371)?(2\d{7})$/;
      const lt = /^(\+)?(370)?(6\d{7}|86\d{7})$/;
      const mobileTrimmed = this.trimWhitespace(this.sharedService.formInfo.mobile);
      //console.log(mobileTrimmed + ' est : ' + est.test(mobileTrimmed));
      //console.log(mobileTrimmed + ' lv : ' + lv.test(mobileTrimmed));
      //console.log(mobileTrimmed + ' lt : ' + lt.test(mobileTrimmed));
      return  lv.test(mobileTrimmed) || lt.test(mobileTrimmed) || est.test(mobileTrimmed);
    }
    return false;
  }

  private trimWhitespace(text: any) {
    let trimmedText = text.replace(/( |-)/g, '');
    return trimmedText;
  }

  validateEmail() {
    if (!isNullOrUndefined(this.sharedService.formInfo.email)) {
      // Kasutatud on email validaatorit (viide: http://emailregex.com/), kuhu on juurde lisatud ka täpitähed
      const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zäöõüA-ZÄÖÕÜ\-0-9]+\.)+[a-zäöõüA-ZÄÖÕÜ]{2,}))$/;
      //console.log(this.sharedService.formInfo.email + ' : ' + emailRegEx.test(this.sharedService.formInfo.email));
      return emailRegEx.test(this.sharedService.formInfo.email);
    }
    return false;
  }
  validateName() {
    if (!isNullOrUndefined(this.sharedService.formInfo.name)) {
      const nameRegEx = XRegExp("^(\\pL+(\\s|\\-)*)+$");
      //console.log(this.sharedService.formInfo.name + ' : ' + nameRegEx.test(this.sharedService.formInfo.name));
      return nameRegEx.test(this.sharedService.formInfo.name);
    }
    return false;
  }

  search = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .map(term => term.length < 2 ? []
        : this.filteredCompaniesString.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
}
