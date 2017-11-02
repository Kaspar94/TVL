
import {Http, Headers, RequestOptions} from "@angular/http";
import {Observable} from "rxjs";
import {BusinessClient, Language} from "./shared.model";
import {Injectable} from "@angular/core";
import {headersToString} from "selenium-webdriver/http";
import {LanguageService} from "@angular/language-service";
import {TranslateService} from "@ngx-translate/core";
import {ClientService} from "../client/client.service";

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
    this.languages.push(new Language('EST','et'));
    this.languages.push(new Language('LAT','lv'));
    this.languages.push(new Language('LIT','lt'));
    this.languages.push(new Language('RUS','ru'));
    this.languages.push(new Language('ENG','en'));
    this.wareHouses = [];
  }

  loadWareHouseCountries() {
    return this.http.get('/returnCountries').subscribe((res) => {
      this.wareHouses = res.json();
    });
  }

  public getClients() {
    return this.http.get('/businessClient')
      .map(response => {
        return response.json();
      });
  }

  public getClient(id: number) {
    return this.http.get('/businessClient/' + id)
      .map(response => {
        return response.json();
      });
  }

  createClient(client: BusinessClient) {
    return this.http.post('/businessClient', client, this.headerOptions()).map(response => {
      return response.json();
    })

  }

  updateClient(client: BusinessClient) {
    return this.http.put('/businessClient/' + client.id, client, this.headerOptions()).map(response => {
      return response.json();
    })
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
}
