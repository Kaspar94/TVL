import {Component} from '@angular/core';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {TranslateService} from "@ngx-translate/core";
import {SharedService} from "../../shared/shared.service";
import {BusinessClient} from "../../shared/shared.model";
import {ClientEditComponent} from "../edit/client-edit.component";

@Component({
  selector: 'client-view-data',
  templateUrl: './client-view.component.html',
  styleUrls: ['../../app.component.css', '../../shared/header/header.css', '../client.css']
})
export class ClientViewComponent {
  clients: BusinessClient[];
  editClient: BusinessClient;
  newClient: BusinessClient;
  axapta: string;
  street: string;
  name: string;
  city: string;
  postIndex: string;
  country: string;
  deliveryCountry: string;
  serviceNumber: string;
  modalOption: NgbModalOptions = {};


  constructor(translate: TranslateService,
              public sharedService: SharedService,
              private modalService: NgbModal) {
    this.clients = [];
    this.sharedService.getClients().subscribe((res) => { this.clients = res;});
    this.modalOption.backdrop = 'static';
    this.modalOption.keyboard = false;
  }

//EDITING CLIENT
  edit(client: BusinessClient) {
    const dialog = (<ClientEditComponent>this.modalService.open(ClientEditComponent, this.modalOption).componentInstance);
    dialog.setClient(client);
  }


  confirmEdit() {
    //TODO
    this.clear();
  }

//ADDING CLIENT
  newBusinessClient() {
    const dialog = (<ClientEditComponent>this.modalService.open(ClientEditComponent, this.modalOption).componentInstance);
    dialog.setClient(new BusinessClient(null, null, null, null, null, null, null, null, null));
  }

  confirmNew() {
    this.newClient = {"id":0,"axapta":"","street":"","name":"","city":"","postIndex":"","country":"","deliveryCountry":"","serviceNumber":""};
    this.newClient.axapta = this.axapta;
    this.newClient.street = this.street;
    this.newClient.name = this.name;
    this.newClient.city = this.city;
    this.newClient.postIndex = this.postIndex;
    this.newClient.country = this.country;
    this.newClient.deliveryCountry = this.deliveryCountry;
    this.newClient.serviceNumber = this.serviceNumber;
    //TODO
    this.clear();
  }

//FOR CLEARING

  clear() {
    this.axapta = "";
    this.street = "";
    this.name = "";
    this.city = "";
    this.postIndex = "";
    this.country = "";
    this.deliveryCountry = "";
    this.serviceNumber = "";
  }

}
