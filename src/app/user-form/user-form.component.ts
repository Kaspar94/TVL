import {Component, AfterViewInit, OnInit} from '@angular/core';
import {BusinessClient} from "../shared/shared.model";
import {SharedService} from "../shared/shared.service";
import {isNullOrUndefined} from "util";
import {isNull} from "util";
import {AlertService} from "../shared/alert/alert.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'user-form',
  templateUrl: 'user-form.component.html',
  styleUrls: ['./user-form.css', '../app.component.css']
})
export class UserFormComponent implements OnInit{
  companies: BusinessClient[];
  filteredCompanies: BusinessClient[];
  countries: any;
  recipient: any;
  deliveryCountry: any;
  name: any;
  mobile: any;
  email: any;
  chosenCompany;

  constructor(public sharedService: SharedService,
              private alertService: AlertService,
              private translateService: TranslateService) {
    this.companies = [];
    this.filteredCompanies = [];
    this.countries = [];
    this.sharedService.getClients().subscribe((res) => {
      this.companies = res;
      this.filteredCompanies = res;
      this.companies.forEach((company) => {
        if (this.countries.findIndex((x) => x === company.deliveryCountry) === -1) {
            this.countries.push(company.deliveryCountry);
        }
      })
    } );
  }


  ngOnInit(): void {
  }

  changeActiveCompany(id: number) {
    const indx = this.companies.findIndex((x) => x.id === id);
    this.recipient = this.companies[indx].name + ' (' + this.companies[indx].country + ')';
    this.chosenCompany = id;
  }

  changeActiveCountry(country: any) {
    this.filteredCompanies = [];
    this.deliveryCountry = country;
    this.companies.forEach((company) => {
      if (company.deliveryCountry === country) {
        this.filteredCompanies.push(company);
      }
    })
  }

  validate() {
    console.log(window.location);
    if ((!isNullOrUndefined(this.email) || !isNullOrUndefined(this.mobile)) &&
      !isNullOrUndefined(this.name) && !isNullOrUndefined(this.deliveryCountry) && !isNullOrUndefined(this.recipient)) {
      const body = {
        business_id: this.chosenCompany,
        client_name: this.name,
        client_email: isNullOrUndefined(this.email) ? null : this.email,
        client_number: isNullOrUndefined(this.mobile) ? null : this.mobile
      };
      this.sharedService.sendReturnInformation(body);

    }
    if (isNullOrUndefined(this.deliveryCountry)) {
      this.alertService.error(this.translateService.instant('error.deliveryCountryNotChosen'),this.translateService.instant('error.failed'));
    } else if (isNullOrUndefined(this.recipient)) {
      this.alertService.error(this.translateService.instant('error.recipientNotChosen'),this.translateService.instant('error.failed'));
    } else if (isNullOrUndefined(this.name)) {
      this.alertService.error(this.translateService.instant('error.noName'),this.translateService.instant('error.failed'));
    } else if (isNullOrUndefined(this.email) && isNullOrUndefined(this.mobile)) {
      this.alertService.error(this.translateService.instant('error.atleastOne'),this.translateService.instant('error.failed'));
    }
  }
}
