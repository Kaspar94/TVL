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

  edit(client: BusinessClient) {
    const dialog = (<ClientEditComponent>this.modalService.open(ClientEditComponent, this.modalOption).componentInstance);
    dialog.setClient(client);
  }

  newBusinessClient() {
    const dialog = (<ClientEditComponent>this.modalService.open(ClientEditComponent, this.modalOption).componentInstance);
    dialog.setClient(new BusinessClient(null, null, null, null, null, null, null, null, null));
  }
}
