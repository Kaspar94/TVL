import {Injectable} from "@angular/core";
import {SharedService} from "../shared/shared.service";
import {BusinessClient} from "../shared/shared.model";
import {isNullOrUndefined} from "util";
import {Http} from "@angular/http";

declare const $: any;

@Injectable()
export class ClientService {
  filteredClients: BusinessClient[];
  filterAxapta: string;
  filterName: string;
  filterStreet: string;
  filterCity: string;
  filterCountry: string;

  constructor(private sharedService: SharedService,
              private http: Http) {
    this.filterAxapta = '';
    this.filterName = '';
    this.filterStreet = '';
    this.filterCity = '';
    this.filterCountry = '';
    this.filteredClients = [];
    this.loadAll();
  }

  loadAll() {
    this.getClients().subscribe((res) => {
      this.filteredClients = res;
    });
  }

  loadWithFilters() {
    this.filter();
  }

  filter() {
    const params = [];
    if (!isNullOrUndefined(this.filterAxapta) && this.filterAxapta.length > 0) {
      params.push({ name: 'axapta', value: this.filterAxapta });
    }
    if (!isNullOrUndefined(this.filterName) && this.filterName.length > 0) {
      params.push({ name: 'name', value: '*' + this.filterName });
    }
    if (!isNullOrUndefined(this.filterStreet) && this.filterStreet.length > 0) {
      params.push({ name: 'street', value: '*' + this.filterStreet });
    }
    if (!isNullOrUndefined(this.filterCity) && this.filterCity.length > 0) {
      params.push({ name: 'city', value: '*' + this.filterCity });
    }
    if (!isNullOrUndefined(this.filterCountry) && this.filterCountry.length > 0) {
      params.push({ name: 'country', value: this.filterCountry });
    }
    params.length !== 0 ? this.filterBackEnd(params) : this.loadAll();
  }

  removeClient(client: BusinessClient) {
    return this.http.delete('/businessClient/'+ client.id, this.sharedService.headerOptions()).subscribe((res) => {
      const result = res.json();
      if (result.status === 'success') {
        this.loadWithFilters();
      }
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
    return this.http.post('/businessClient', client, this.sharedService.headerOptions()).map(response => {
      return response.json();
    });

  }

  updateClient(client: BusinessClient) {
    return this.http.put('/businessClient/' + client.id, client, this.sharedService.headerOptions()).map(response => {
      return response.json();
    });
  }

  private filterBackEnd(params: any[]) {
    return this.http.get('/businessClient/where?'+ $.param(params)).subscribe((res) => {
        this.filteredClients = res.json();
    });
  }
}
