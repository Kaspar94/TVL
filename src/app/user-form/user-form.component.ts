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
  countries: any;
  recipient: any;
  deliveryCountry: any;
  name: any;
  mobile: any;
  email: any;

  constructor(public sharedService: SharedService) {
    this.companies = [];
    this.countries = [];
    this.sharedService.getJSON().subscribe((res) => {
      this.companies = res;
      this.companies.forEach((company) => {
        if (this.countries.findIndex((x) => x === company.country) === -1) {
            this.countries.push(company.country);
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
    this.deliveryCountry = country;
  }

  validate() {
    console.log(this.recipient);
    console.log(this.deliveryCountry);
    console.log(this.name);
    console.log(this.mobile);
    console.log(this.email);
  }
}
