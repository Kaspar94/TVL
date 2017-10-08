
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

  constructor(private http: Http) {
  }

  public getJSON() {
    return this.http.get("assets/clients/clients.json")
      .map(response => {
        return response.json();
      });
  }

}
