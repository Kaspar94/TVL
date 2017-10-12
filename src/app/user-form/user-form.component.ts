import {Component, AfterViewInit, OnInit} from '@angular/core';
import {BusinessClient} from "../shared/shared.model";
import {SharedService} from "../shared/shared.service";

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

  constructor(public sharedService: SharedService) {
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
    console.log(this.recipient);
    console.log(this.deliveryCountry);
    console.log(this.name);
    console.log(this.mobile);
    console.log(this.email);
  }
}
