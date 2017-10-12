
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

  public getClients() {
    return this.http.get("/businessClient")
      .map(response => {
        console.log(response.json());
        return response.json();
      });
  }
  public getClient(id:number) {
    return this.http.get("/businessClient/"+id)
      .map(response => {
        console.log(response.json());
        return response.json();
      });
  }

}
