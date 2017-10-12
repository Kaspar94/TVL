import {Component} from '@angular/core';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {TranslateService} from "@ngx-translate/core";
import {SharedService} from "../../shared/shared.service";
import {BusinessClient} from "../../shared/shared.model";
import {ClientEditComponent} from "../edit/client-edit.component";
import {isNullOrUndefined} from "util";
import {isNull} from "util";
import {ClientService} from "../client.service";

@Component({
  selector: 'client-view-data',
  templateUrl: './client-view.component.html',
  styleUrls: ['../../app.component.css', '../../shared/header/header.css', '../client.css']
})
export class ClientViewComponent {
  modalOption: NgbModalOptions = {};


  constructor(translate: TranslateService,
              public sharedService: SharedService,
              public clientService: ClientService,
              private modalService: NgbModal) {
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

  canFilter() {
    return (isNullOrUndefined(this.clientService.filterAxapta) &&
        isNullOrUndefined(this.clientService.filterName) &&
        isNullOrUndefined(this.clientService.filterStreet) &&
        isNullOrUndefined(this.clientService.filterCity) &&
        isNullOrUndefined(this.clientService.filterCountry)
    )
  }

  emptyFilters() {
    this.clientService.filterAxapta = null;
    this.clientService.filterName = null;
    this.clientService.filterStreet = null;
    this.clientService.filterCity = null;
    this.clientService.filterCountry = null;
    this.clientService.filter();
  }
}
