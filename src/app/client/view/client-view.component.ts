import {Component} from '@angular/core';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {TranslateService} from "@ngx-translate/core";
import {SharedService} from "../../shared/shared.service";
import {BusinessClient} from "../../shared/shared.model";
import {ClientEditComponent} from "../edit/client-edit.component";
import {isNullOrUndefined} from "util";
import {isNull} from "util";

@Component({
  selector: 'client-view-data',
  templateUrl: './client-view.component.html',
  styleUrls: ['../../app.component.css', '../../shared/header/header.css', '../client.css']
})
export class ClientViewComponent {
  clients: BusinessClient[];
  filteredClients: BusinessClient[];
  filterAxapta: string;
  filterName: string;
  filterStreet: string;
  filterCity: string;
  filterCountry: string;
  modalOption: NgbModalOptions = {};


  constructor(translate: TranslateService,
              public sharedService: SharedService,
              private modalService: NgbModal) {
    this.clients = [];
    this.filteredClients = [];
    this.sharedService.getClients().subscribe((res) => {
      this.clients = res;
      this.filteredClients = res;
    });
    this.modalOption.backdrop = 'static';
    this.modalOption.keyboard = false;
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

  edit(client: BusinessClient) {
    const dialog = (<ClientEditComponent>this.modalService.open(ClientEditComponent, this.modalOption).componentInstance);
    dialog.setClient(client);
  }

  newBusinessClient() {
    const dialog = (<ClientEditComponent>this.modalService.open(ClientEditComponent, this.modalOption).componentInstance);
    dialog.setClient(new BusinessClient(null, null, null, null, null, null, null, null, null));
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

  canFilter() {
    return (isNullOrUndefined(this.filterAxapta) &&
        isNullOrUndefined(this.filterName) &&
        isNullOrUndefined(this.filterStreet) &&
        isNullOrUndefined(this.filterCity) &&
        isNullOrUndefined(this.filterCountry)
    )
  }

  emptyFilters() {
    this.filterAxapta = null;
    this.filterName = null;
    this.filterStreet = null;
    this.filterCity = null;
    this.filterCountry = null;
    this.filter();
  }
}
