import {Component, OnInit} from '@angular/core';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {TranslateService} from '@ngx-translate/core';
import {SharedService} from '../../shared/shared.service';
import {BusinessClient} from '../../shared/shared.model';
import {ClientEditComponent} from '../edit/client-edit.component';
import {isNullOrUndefined} from 'util';
import {isNull} from 'util';
import {ClientService} from '../client.service';

@Component({
  selector: 'client-view-data',
  templateUrl: './client-view.component.html',
  styleUrls: ['../../app.component.css', '../../shared/header/header.css', '../client.css']
})
export class ClientViewComponent implements OnInit{
  modalOption: NgbModalOptions = {};


  constructor(translate: TranslateService,
              public sharedService: SharedService,
              public clientService: ClientService,
              private modalService: NgbModal) {
    this.modalOption.backdrop = 'static';
    this.modalOption.keyboard = false;
  }

  ngOnInit() {
    this.clientService.loadAll();
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
    return (this.clientService.filterAxapta.length === 0 &&
      this.clientService.filterName.length === 0 &&
      this.clientService.filterStreet.length === 0 &&
      this.clientService.filterCity.length === 0 &&
      this.clientService.filterCountry.length === 0
    );
  }

  emptyFilters() {
    this.clientService.filterAxapta = '';
    this.clientService.filterName = '';
    this.clientService.filterStreet = '';
    this.clientService.filterCity = '';
    this.clientService.filterCountry = '';
    this.clientService.filter();
  }
}
