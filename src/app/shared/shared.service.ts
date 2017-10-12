
import {Http} from "@angular/http";
import {Observable} from "rxjs";
import {BusinessClient} from "./shared.model";
import {Injectable} from "@angular/core";

@Injectable()
export class SharedService {

  loggedIn: boolean;
  username: any;
  password: any;
  title: any;
  lang: any;

  resourceUrl = 'http://localhost';

  constructor(private http: Http) {
  }

  public getClients() {
    return this.http.get(this.resourceUrl + '/businessClient')
      .map(response => {
        console.log(response.json());
        return response.json();
      });
  }

  public getClient(id: number) {
    return this.http.get(this.resourceUrl + '/businessClient/' + id)
      .map(response => {
        console.log(response.json());
        return response.json();
      });
  }

  createClient(client: BusinessClient) {
    return this.http.post(this.resourceUrl + '/businessClient', client).map(response => {
      return response.json();
    })

  }

  updateClient(client: BusinessClient) {
    return this.http.put(this.resourceUrl + '/businessClient/' + client.id, client).map(response => {
      return response.json();
    })
  }
}
