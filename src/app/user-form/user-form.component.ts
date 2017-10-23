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

  changeActiveCompany(indx: number) {
    this.recipient = this.companies[indx].name + ' (' + this.companies[indx].country + ')';
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
    if (!isNullOrUndefined(this.email) || !isNullOrUndefined(this.mobile)) {
      this.sharedService.successfullyReturned = !this.sharedService.successfullyReturned;
    }
    if (isNullOrUndefined(this.email) && isNullOrUndefined(this.mobile)) {
      this.alertService.error(this.translateService.instant('error.atleastOne'),this.translateService.instant('error.failed'));
    }
  }
}
