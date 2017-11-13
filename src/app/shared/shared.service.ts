
import {Http, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {BusinessClient, Language} from './shared.model';
import {Injectable} from '@angular/core';
import {headersToString} from 'selenium-webdriver/http';
import {LanguageService} from '@angular/language-service';
import {TranslateService} from '@ngx-translate/core';
import {ClientService} from '../client/client.service';

@Injectable()
export class SharedService {

  loggedIn: boolean;
  username: string;
  password: string;
  title: any;
  languages: Language[];
  lang: Language;
  successfullyReturned: boolean;
  deliveryCountry: any;
  wareHouses: string[];

  constructor(private http: Http) {
    this.deliveryCountry = '';
    this.languages = [];
    this.languages.push(new Language('EST', 'et'));
    this.languages.push(new Language('LAT', 'lv'));
    this.languages.push(new Language('LIT', 'lt'));
    this.languages.push(new Language('RUS', 'ru'));
    this.languages.push(new Language('ENG', 'en'));
    this.wareHouses = [];
  }

  loadWareHouseCountries() {
    return this.http.get('/returnCountries').subscribe((res) => {
      this.wareHouses = res.json();
    });
  }

  login() {
    return this.http.get('/login', this.headerOptions()).map(response => {
      return response.json();
    });
  }

  headerOptions() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Basic '+ btoa(this.username + ':' + this.password));
    return new RequestOptions({headers: headers});
  }

  sendReturnInformation(body: {business_id: any; client_name: any; client_email: any; client_number: any}) {
    return this.http.put('/return/client', body).subscribe((res) => {
        this.successfullyReturned = !this.successfullyReturned;
    });
  }

  filterDeliveryCountry(country: any) {
    return this.http.get('/businessClient/where?deliveryCountry=' + country);
  }
}
