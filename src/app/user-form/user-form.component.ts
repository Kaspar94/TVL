import {Component, AfterViewInit, OnInit} from '@angular/core';
import {BusinessClient} from "../shared/shared.model";
import {SharedService} from "../shared/shared.service";
import {isNullOrUndefined} from "util";
import {isNull} from "util";
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
  companies: BusinessClient[];
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
    this.companies = [];
    this.filteredCompanies = [];
    this.sharedService.getClients().subscribe((res) => {
      this.companies = res;
      if (this.sharedService.deliveryCountry.length !== 0) {
          this.changeActiveCountry(this.sharedService.deliveryCountry);
      } else {
          this.filteredCompanies = res;
      }
      this.sharedService.loadWareHouseCountries();
      });
  }


  ngOnInit(): void {

  }

  changeActiveCompany(id: number) {
    const indx = this.companies.findIndex((x) => x.id === id);
    this.recipient = this.companies[indx].name;
    this.chosenCompany = this.companies[indx];
  }

  changeActiveCountry(country: any) {
    this.filteredCompanies = [];
    this.filteredCompaniesString = [];
    this.sharedService.deliveryCountry = country;
    this.companies.forEach((company) => {
      if (company.deliveryCountry === country) {
        this.filteredCompanies.push(company);
        this.filteredCompaniesString.push(company.name);
      }
    })
  }

  validate() {
    if ((!isNullOrUndefined(this.chosenCompany) && this.chosenCompany.name !== this.recipient) || isNullOrUndefined(this.chosenCompany)) {
      const indx = this.companies.findIndex((x) => x.name === this.recipient);
      if (indx > -1) {
        this.chosenCompany = this.companies[indx];
      }
    }
    if ((!isNullOrUndefined(this.email) || !isNullOrUndefined(this.mobile)) &&
      !isNullOrUndefined(this.name) && !isNullOrUndefined(this.sharedService.deliveryCountry)
      && !isNullOrUndefined(this.recipient) && this.chosenCompany.name === this.recipient) {
      const body = {
        business_id: this.chosenCompany.id,
        client_name: this.name,
        client_email: isNullOrUndefined(this.email) ? null : this.email,
        client_number: isNullOrUndefined(this.mobile) ? null : this.mobile
      };
      this.sharedService.sendReturnInformation(body);

    }
    if (isNullOrUndefined(this.sharedService.deliveryCountry)) {
      this.alertService.error(this.translateService.instant('error.deliveryCountryNotChosen'),this.translateService.instant('error.failed'));
    } else if (isNullOrUndefined(this.recipient)) {
      this.alertService.error(this.translateService.instant('error.recipientNotChosen'),this.translateService.instant('error.failed'));
    } else if (isNullOrUndefined(this.name)) {
      this.alertService.error(this.translateService.instant('error.noName'),this.translateService.instant('error.failed'));
    } else if (isNullOrUndefined(this.email) && isNullOrUndefined(this.mobile)) {
      this.alertService.error(this.translateService.instant('error.atleastOne'),this.translateService.instant('error.failed'));
    } else if (this.chosenCompany.name !== this.recipient) {
      this.alertService.error(this.translateService.instant('error.doesNotExist'), this.translateService.instant('error.failed'));
    }
  }

  search = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .map(term => term.length < 2 ? []
        : this.filteredCompaniesString.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));
}
