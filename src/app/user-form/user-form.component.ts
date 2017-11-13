import {Component, AfterViewInit, OnInit} from '@angular/core';
import {BusinessClient} from '../shared/shared.model';
import {SharedService} from '../shared/shared.service';
import {AlertService} from '../shared/alert/alert.service';
import {TranslateService} from '@ngx-translate/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import {ClientService} from '../client/client.service';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'user-form',
  templateUrl: 'user-form.component.html',
  styleUrls: ['./user-form.css', '../app.component.css']
})
export class UserFormComponent implements OnInit {
  filteredCompanies: BusinessClient[];
  filteredCompaniesString: string[];
  recipient: any;
  name: any;
  mobile: any;
  email: any;
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
    if (this.validateName() && (this.validateEmail() || this.validateNumber()) && !isNullOrUndefined(this.chosenCompany)) {
      const body = {
        business_id: this.chosenCompany.id,
        client_name: this.name,
        client_email: isNullOrUndefined(this.email) ? null : this.email,
        client_number: isNullOrUndefined(this.mobile) ? null : this.trimWhitespace(this.mobile)
      };
      this.sharedService.sendReturnInformation(body);
    } else if (isNullOrUndefined(this.sharedService.deliveryCountry)) {
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
        }
    } else if (this.chosenCompany.name !== this.recipient) {
        this.alertService.error(this.translateService.instant('error.doesNotExist'), this.translateService.instant('error.failed'));
    } else if (isNullOrUndefined(this.name) || !this.validateName()) {
        this.alertService.error(this.translateService.instant('error.noName'), this.translateService.instant('error.failed'));
    } else if (isNullOrUndefined(this.email) && isNullOrUndefined(this.mobile)) {
        this.alertService.error(this.translateService.instant('error.atleastOne'), this.translateService.instant('error.failed'));
    }

    if ((isNullOrUndefined(this.email) || this.email === '') && !isNullOrUndefined(this.mobile)) {
        if (!this.validateNumber()) {
            this.alertService.error(this.translateService.instant('error.invalidNumber'), this.translateService.instant('error.failed'));
        }
    } else if (!isNullOrUndefined(this.email) && (isNullOrUndefined(this.mobile) || this.mobile === '')) {
        if (!this.validateEmail()) {
          this.alertService.error(this.translateService.instant('error.invalidEmail'), this.translateService.instant('error.failed'));
        }
    }

  }

  validateNumber() {
    if (!isNullOrUndefined(this.mobile)) {
      // Validaatorid on tehtud Omniva juhendi järgi mobiilinumbrite valideerimise osas. Viide -> https://www.omniva.ee/public/files/failid/manual_xml_dataexchange_eng.pdf -> lk. 7
      const est = /^(\+)?(372)?(5\d{6,7}|8\d{7})$/;
      const lv = /^(\+)?(371)?(2\d{7})$/;
      const lt = /^(\+)?(370)?(6\d{7}|86\d{7})$/;
      const mobileTrimmed = this.trimWhitespace(this.mobile);
      // console.log(mobileTrimmed + ' est : ' + est.test(mobileTrimmed));
      // console.log(mobileTrimmed + ' lv : ' + lv.test(mobileTrimmed));
      // console.log(mobileTrimmed + ' lt : ' + lt.test(mobileTrimmed));
      return  lv.test(mobileTrimmed) || lt.test(mobileTrimmed) || est.test(mobileTrimmed);
    }
    return false;
  }

  private trimWhitespace(text: any) {
    let trimmedText = text;
    while (trimmedText.indexOf(' ') > -1) {
      trimmedText = trimmedText.replace(' ', '');
    }
    while (trimmedText.indexOf('-') > -1) {
      trimmedText = trimmedText.replace('-', '');
    }
    return trimmedText;
  }

  validateEmail() {
    if (!isNullOrUndefined(this.email)) {
      // Kasutatud on email validaatorit (viide: http://emailregex.com/), kuhu on juurde lisatud ka täpitähed
      const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zäöõüA-ZÄÖÕÜ\-0-9]+\.)+[a-zäöõüA-ZÄÖÕÜ]{2,}))$/;
      // console.log(this.email + ' : ' + emailRegEx.test(this.email));
      return emailRegEx.test(this.email);
    }
    return false;
  }
  validateName() {
    if (!isNullOrUndefined(this.name)) {
      const nameRegEx = /^[a-zõüäöA-ZÕÜÄÖ ]*$/;
      // console.log(this.name + ' : ' + nameRegEx.test(this.name));
      return nameRegEx.test(this.name);
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
