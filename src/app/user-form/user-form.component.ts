import {Component, AfterViewInit, OnInit} from '@angular/core';
import {Company, Country} from "../shared/shared.model";

@Component({
  selector: 'user-form',
  templateUrl: 'user-form.component.html',
  styleUrls: ['./user-form.css', '../app.component.css']
})
export class UserFormComponent implements OnInit{
  companies: any;
  countries: any;
  recipient: any;
  deliveryCountry: any;
  name: any;
  mobile: any;
  email: any;

  constructor() {
    this.companies = [];
    this.countries = [];
    this.companies.push(new Company(1,'Company1','EST'));
    this.companies.push(new Company(2,'Company1','LTV'));
    this.companies.push(new Company(3,'Company1','LAT'));
    this.companies.push(new Company(4,'Company2','EST'));
    this.companies.push(new Company(5,'Company3','EST'));
    this.companies.push(new Company(6,'Company4','EST'));
    this.countries.push(new Country(0,"Estonia","EST"));
    this.countries.push(new Country(1,"Latvia","LAT"));
    this.countries.push(new Country(2,"Lithuania","LTU"));
    this.countries.push(new Country(3,"Finland","FIN"));
    this.countries.push(new Country(4,"England","ENG"));
    this.countries.push(new Country(5,"Russia","RUS"));
  }


  ngOnInit(): void {
  }

  changeActiveCompany(id: number) {
    const indx = this.companies.findIndex((x) => x.id === id);
    this.recipient = this.companies[indx].name + ' (' + this.companies[indx].origin + ')';
  }

  changeActiveCountry(id: number) {
    const indx = this.countries.findIndex((x) => x.id === id);
    this.deliveryCountry = this.countries[indx].fullName + ' (' + this.countries[indx].shortName + ')';
  }

  validate() {
    console.log(this.recipient);
    console.log(this.deliveryCountry);
    console.log(this.name);
    console.log(this.mobile);
    console.log(this.email);
  }
}
