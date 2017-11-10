import {Component, AfterViewInit, OnInit} from '@angular/core';
import {BusinessClient} from "../shared/shared.model";
import {SharedService} from "../shared/shared.service";
import {AlertService} from "../shared/alert/alert.service";
import {TranslateService} from "@ngx-translate/core";
import {Observable} from "rxjs";
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import {ClientService} from "../client/client.service";

@Component({
  selector: 'user-form',
  templateUrl: 'user-form.component.html',
  styleUrls: ['./user-form.css', '../app.component.css']
})
export class UserFormComponent implements OnInit{
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
    })
  }

  validate() {
    if (this.isNullOrUndefined(this.sharedService.deliveryCountry)) {
      this.alertService.error(this.translateService.instant('error.deliveryCountryNotChosen'),this.translateService.instant('error.failed'));
    } else if (this.isNullOrUndefined(this.recipient)) {
      this.alertService.error(this.translateService.instant('error.recipientNotChosen'),this.translateService.instant('error.failed'));
    } else if ((!this.isNullOrUndefined(this.chosenCompany) && this.chosenCompany.name !== this.recipient) || this.isNullOrUndefined(this.chosenCompany)){
      const indx = this.filteredCompanies.findIndex((x) => x.name === this.recipient);
      if (indx > -1) {
        this.chosenCompany = this.filteredCompanies[indx];
      }
    } else if (this.chosenCompany.name !== this.recipient) {
      this.alertService.error(this.translateService.instant('error.doesNotExist'), this.translateService.instant('error.failed'));
    } else if (this.isNullOrUndefined(this.name)) {
      this.alertService.error(this.translateService.instant('error.noName'),this.translateService.instant('error.failed'));
    } else if (!this.validateName(this.name)) {
      this.alertService.error(this.translateService.instant('error.noName'),this.translateService.instant('error.failed'));
    } else if (this.isNullOrUndefined(this.email) && this.isNullOrUndefined(this.mobile)) {
      this.alertService.error(this.translateService.instant('error.atleastOne'),this.translateService.instant('error.failed'));
    } else if (!this.validateNumber(this.mobile) && !this.isNullOrUndefined(this.mobile)) {
      this.alertService.error(this.translateService.instant('error.invalidNumber'),this.translateService.instant('error.failed'));
    } else if (!this.validateEmail(this.email) && !this.isNullOrUndefined(this.email)) {
      this.alertService.error(this.translateService.instant('error.invalidEmail'),this.translateService.instant('error.failed'));
    } else {
      const body = {
        business_id: this.chosenCompany.id,
        client_name: this.name,
        client_email: this.isNullOrUndefined(this.email) ? null : this.email,
        client_number: this.isNullOrUndefined(this.mobile) ? null : this.mobile
      };
      this.sharedService.sendReturnInformation(body);
    }
  }

  isNullOrUndefined(any:any) {
    if(any) return false 
    else return true
  }
  validateNumber(number:any) {
    var est = /^(\+)?(372)?(5\d{6,7}|8\d{7})$|^(\+)?(372\s)?(5\d{1}\s\d{2,3}\s\d{3}|8\d{1}\s\d{3}\s\d{3})$/,
        lv = /^(\+)?(371)?(2\d{7})$|^(\+)?(371\s)?(2\d{1}\s\d{3}\s\d{3})$/,
        lt = /^(\+)?(370)?(6\d{7}|86\d{7})$|^(\+)?(370\s)?(6\d{1}\s\d{3}\s\d{3}|86\s\d{2}\s\d{2}\s\d{3})$/;
    //console.log(number + " est : " + est.test(number))
    //console.log(number + " lv : " + lv.test(number))
    //console.log(number + " lt : " + lt.test(number))
    return  lv.test(number)||lt.test(number)||est.test(number);
  }
  validateEmail(email:any) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    //console.log(email + " : " + re.test(email))
    return re.test(email);
  }
  validateName(name:any) {
    var re = /^[a-zõüäöA-ZÕÜÄÖ ]*$/;
    //console.log(name + " : " + re.test(name))
    return re.test(name);
  }

  search = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .map(term => term.length < 2 ? []
        : this.filteredCompaniesString.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));
}
