
import {Http, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {BusinessClient, FormInfo, Language} from './shared.model';
import {Injectable} from '@angular/core';
import {LanguageService} from '@angular/language-service';
import {TranslateService} from '@ngx-translate/core';
import {ClientService} from '../client/client.service';
import {AlertService} from './alert/alert.service';

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
  formInfo: FormInfo;

  constructor(private http: Http,
              private alertService: AlertService,
              private translateService: TranslateService) {
    this.deliveryCountry = '';
    this.languages = [];
    this.languages.push(new Language('EST', 'et'));
    this.languages.push(new Language('LAT', 'lv'));
    this.languages.push(new Language('LIT', 'lt'));
    this.languages.push(new Language('RUS', 'ru'));
    this.languages.push(new Language('ENG', 'en'));
    this.wareHouses = [];
    this.formInfo = new FormInfo(null, null, null);
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
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Basic '+ btoa(this.username + ':' + this.password));
    return new RequestOptions({headers: headers});
  }

  sendReturnInformation(body: {business_id: any; client_name: any; client_email: any; client_number: any}) {
    return this.http.put('/return/client', body).subscribe((res) => {
      console.log(res['_body']);
      if (res['_body'].indexOf('Messages successfully received!') > -1) {
        this.successfullyReturned = !this.successfullyReturned;
      } else {
        this.alertService.error(this.translateService.instant('error.failedReturn'));
      }
    });
  }

  filterDeliveryCountry(country: any) {
    return this.http.get('/businessClient/l/where?deliveryCountry=' + country);
  }
}
