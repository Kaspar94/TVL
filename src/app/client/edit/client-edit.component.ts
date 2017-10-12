import {Component} from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {TranslateService} from "@ngx-translate/core";
import {SharedService} from "../../shared/shared.service";
import {BusinessClient} from "../../shared/shared.model";
import {isNull} from "util";

@Component({
  selector: 'client-edit-data',
  templateUrl: './client-edit.component.html',
  styleUrls: ['../../app.component.css', '../../shared/header/header.css', '../client.css']
})
export class ClientEditComponent {

  tempClient: BusinessClient;
  client: BusinessClient;

  constructor(translate: TranslateService,
              public activeModal: NgbActiveModal,
              public sharedService: SharedService,
              private modalService: NgbModal) {
  }

  setClient(client: BusinessClient) {
    this.client = client;
    this.tempClient = new BusinessClient(client.id, client.axapta, client.name, client.street, client.city,
      client.postIndex, client.country, client.deliveryCountry, client.serviceNumber);
  }

  close() {
    this.activeModal.dismiss();
  }

  confirmChanges() {
    console.log("something");
    console.log(this.clientEquals(this.tempClient, this.client));
    if (this.clientEquals(this.tempClient, this.client)) {
      this.close();
    } else {
      //TODO: Success/error message
      if (isNull(this.client.id)) {
        this.sharedService.createClient(this.client).subscribe((response) => {
          console.log(response);
          this.close();
        })
      } else {
        this.sharedService.updateClient(this.client).subscribe((response) => {
          console.log(response);
          this.close();
        })
      }
    }
  }

  clientEquals(original: BusinessClient, changed: BusinessClient) {
    return (original.axapta === changed.axapta &&
      original.street === changed.street &&
      original.name === changed.name &&
      original.city === changed.city &&
      original.postIndex === changed.postIndex &&
      original.country === changed.country &&
      original.deliveryCountry === changed.deliveryCountry &&
      original.serviceNumber === changed.serviceNumber
    );
  }
}
