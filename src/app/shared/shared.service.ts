
import {Http, Headers, RequestOptions} from "@angular/http";
import {Observable} from "rxjs";
import {BusinessClient} from "./shared.model";
import {Injectable} from "@angular/core";
import {headersToString} from "selenium-webdriver/http";

@Injectable()
export class SharedService {

  loggedIn: boolean;
  username: string;
  password: string;
  title: any;
  lang: any;
  successfullyReturned: boolean;
  resourceUrl = '';

  constructor(private http: Http) {
  }

  public getClients() {
    return this.http.get(this.resourceUrl + '/businessClient')
      .map(response => {
        return response.json();
      });
  }

  public getClient(id: number) {
    return this.http.get(this.resourceUrl + '/businessClient/' + id)
      .map(response => {
        return response.json();
      });
  }

  createClient(client: BusinessClient) {
    return this.http.post(this.resourceUrl + '/businessClient', client, this.headerOptions()).map(response => {
      return response.json();
    })

  }

  updateClient(client: BusinessClient) {
    return this.http.put(this.resourceUrl + '/businessClient/' + client.id, client, this.headerOptions()).map(response => {
      return response.json();
    })
  }

  login() {
    return this.http.get(this.resourceUrl + '/login', this.headerOptions()).map(response => {
      return response.json();
    });
  }

  headerOptions() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Basic '+ btoa(this.username + ':' + this.password));
    return new RequestOptions({headers: headers});
  }
}
