import {Injectable} from "@angular/core";
import {SharedService} from "../shared/shared.service";
import {BusinessClient} from "../shared/shared.model";
import {isNullOrUndefined} from "util";
import {Http} from "@angular/http";

@Injectable()
export class ClientService {
  clients: BusinessClient[];
  filteredClients: BusinessClient[];

  filterAxapta: string;
  filterName: string;
  filterStreet: string;
  filterCity: string;
  filterCountry: string;

  constructor(private sharedService: SharedService,
              private http: Http) {
    this.clients = [];
    this.filteredClients = [];
    this.loadAll();
  }

  loadAll() {
    this.sharedService.getClients().subscribe((res) => {
      this.clients = res;
      this.filteredClients = res;
    });
  }

  loadWithFilters() {
    this.sharedService.getClients().subscribe((res) => {
      this.clients = res;
      this.filter();
    });
  }

  filter() {
    this.filteredClients = this.filterWithParam(null, null, this.clients);
    if (!isNullOrUndefined(this.filterAxapta)) {
      this.filteredClients = this.filterWithParam("axapta", this.filterAxapta, this.filteredClients);
    }
    if (!isNullOrUndefined(this.filterName)) {
      this.filteredClients = this.filterWithParam("name", this.filterName, this.filteredClients);
    }
    if (!isNullOrUndefined(this.filterStreet)) {
      this.filteredClients = this.filterWithParam("street", this.filterStreet, this.filteredClients);
    }
    if (!isNullOrUndefined(this.filterCity)) {
      this.filteredClients = this.filterWithParam("city", this.filterCity, this.filteredClients);
    }
    if (!isNullOrUndefined(this.filterCountry)) {
      this.filteredClients = this.filterCountries(this.filterCountry, this.filteredClients);
    }
  }

  private filterWithParam(attributeCode: string, attributeValue: string, clients: BusinessClient[]) {
    const tempClients = [];
    clients.forEach((client) => {
      if (!isNullOrUndefined(attributeCode) && !isNullOrUndefined(attributeValue)) {
        if ((client[attributeCode].toLowerCase()).indexOf((attributeValue.toLowerCase())) >= 0) {
          tempClients.push(client);
        }
      } else {
        tempClients.push(client);
      }
    });
    return tempClients;
  }

  private filterCountries(filterCountry: string, clients: BusinessClient[]) {
    const tempClients = [];
    clients.forEach((client) => {
      if (!isNullOrUndefined(filterCountry)) {
        if (client.country === filterCountry || client.deliveryCountry === filterCountry) {
          tempClients.push(client);
        }
      }
    });
    return tempClients;
  }


  removeClient(client: BusinessClient) {
    return this.http.delete('/businessClient/'+ client.id, this.sharedService.headerOptions()).subscribe((res) => {
      const result = res.json();
      if (result.status === 'success') {
        this.loadWithFilters();
      }
    });
  }

}
