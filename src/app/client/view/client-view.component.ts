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
  client: BusinessClient;
  id: number;
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
    this.sharedService.getJSON().subscribe((res) => { this.clients = res;});
  }

  edit(modal, client: BusinessClient) {
    this.client = client;
    this.axapta = client.axapta;
    this.street = client.street;
    this.modalService.open(modal);
  }

  confirmEdit() {
    this.client.axapta = this.axapta;
    this.client.street = this.street;
  }

}
