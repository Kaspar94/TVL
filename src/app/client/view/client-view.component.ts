import {Component} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TranslateService} from "@ngx-translate/core";
import {SharedService} from "../../shared/shared.service";
import {BusinessClient} from "../../shared/shared.model";

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

  constructor(translate: TranslateService,
              public sharedService: SharedService,
              private modalService: NgbModal) {
    this.clients = [];
    this.sharedService.getClients().subscribe((res) => { this.clients = res;});
  }

//EDITING CLIENT
  edit(modal, id) {
    this.sharedService.getClient(id).subscribe((res) => { this.editClient = res;});
    this.axapta = this.editClient.axapta;
    this.street = this.editClient.street;
    this.name = this.editClient.name;
    this.city = this.editClient.city;
    this.postIndex = this.editClient.postIndex;
    this.country = this.editClient.country;
    this.deliveryCountry = this.editClient.deliveryCountry;
    this.serviceNumber = this.editClient.serviceNumber;
    this.modalService.open(modal).result.then((result) => {
    }, (reason) => {
      this.clear();
    });
  }

  confirmEdit() {
    //TODO
    this.clear();
  }

//ADDING CLIENT
  new(modal) {
    this.modalService.open(modal).result.then((result) => {
    }, (reason) => {
      this.clear();
    });
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
