import {Component} from '@angular/core';
import {NgbModal, NgbActiveModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {TranslateService} from '@ngx-translate/core';
import {SharedService} from '../../shared/shared.service';
import {BusinessClient} from '../../shared/shared.model';
import {isNull, isNullOrUndefined} from 'util';
import {ClientService} from '../client.service';
import {AlertService} from '../../shared/alert/alert.service';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm.dialog.component';
import {LoginComponent} from '../../shared/login/login.component';

@Component({
  selector: 'client-edit-data',
  templateUrl: './client-edit.component.html',
  styleUrls: ['../../app.component.css', '../../shared/header/header.css', '../client.css', '../../user-form/user-form.css']
})
export class ClientEditComponent {

  tempClient: BusinessClient;
  client: BusinessClient;
  modalOption: NgbModalOptions = {};

  constructor(translate: TranslateService,
              public activeModal: NgbActiveModal,
              public sharedService: SharedService,
              public clientService: ClientService,
              private modalService: NgbModal,
              private alertService: AlertService,
              private translateService: TranslateService) {
  }

  remove() {
    const dialog = (<ConfirmDialogComponent>this.modalService.open(ConfirmDialogComponent, this.modalOption).componentInstance);
    dialog.setParentModal(this.activeModal);
    dialog.setConfirmCallbackMethod(this.removeClient);
    dialog.setTitle(this.translateService.instant('dialog.title.remove'));
    dialog.setMessage(this.translateService.instant('dialog.message.remove'));
  }

  removeClient = () => {
    this.clientService.removeClient(this.client);
    this.alertService.success(this.translateService.instant('success.modifiedData'), this.translateService.instant('success.title'));
  }

  setClient(client: BusinessClient) {
    this.client = client;
    this.tempClient = new BusinessClient(client.id, client.axapta, client.name, client.street, client.city,
      client.postIndex, client.country, client.deliveryCountry, client.serviceNumber);
  }

  close() {
    this.activeModal.dismiss();
  }

  makeChanges() {
    this.client.axapta = this.tempClient.axapta;
    this.client.name = this.tempClient.name;
    this.client.street = this.tempClient.street;
    this.client.city = this.tempClient.city;
    this.client.postIndex = this.tempClient.postIndex;
    this.client.country = this.tempClient.country;
    this.client.deliveryCountry = this.tempClient.deliveryCountry;
    this.client.serviceNumber = this.tempClient.serviceNumber;
  }

  confirmChanges() {
    const dialog = (<ConfirmDialogComponent>this.modalService.open(ConfirmDialogComponent, this.modalOption).componentInstance);
    dialog.setParentModal(this.activeModal);
    dialog.setConfirmCallbackMethod(this.confirmClient);
    dialog.setTitle(this.translateService.instant(isNull(this.client.id) ? 'dialog.title.new' : 'dialog.title.edit'));
    dialog.setMessage(this.translateService.instant(isNull(this.client.id) ? 'dialog.message.new' : 'dialog.message.edit'));
  }

  confirmClient = () => {
    if (this.clientEquals(this.tempClient, this.client)) {
      this.close();
    } else {
      this.makeChanges();
      if (isNull(this.client.id)) {
        this.clientService.createClient(this.client).subscribe((response) => {
          this.clientService.loadWithFilters();
          this.close();
          this.alertService.success(this.translateService.instant('success.newData'), this.translateService.instant('success.title'));
        }, (err) => this.alertService.error(err));
      } else {
        this.clientService.updateClient(this.client).subscribe((response) => {
          this.clientService.loadWithFilters();
          this.close();
          this.alertService.success(this.translateService.instant('success.modifiedData'), this.translateService.instant('success.title'));
        }, (err) => this.alertService.error(err));
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

  changeCountry(wareHouse: string) {
      this.tempClient.country = wareHouse;
  }

  changeDeliveryCountry(wareHouse: string) {
      this.tempClient.deliveryCountry = wareHouse;
  }

  isFormFilled() {
    return !isNullOrUndefined(this.tempClient.axapta) && this.tempClient.axapta.length > 0
      && !isNullOrUndefined(this.tempClient.name) && this.tempClient.name.length > 0
      && !isNullOrUndefined(this.tempClient.street) && this.tempClient.street.length > 0
      && !isNullOrUndefined(this.tempClient.city) && this.tempClient.city.length > 0
      && !isNullOrUndefined(this.tempClient.postIndex) && this.tempClient.postIndex.length > 0
      && !isNullOrUndefined(this.tempClient.country) && this.tempClient.country.length > 0
      && !isNullOrUndefined(this.tempClient.deliveryCountry) && this.tempClient.deliveryCountry.length > 0
      && !isNullOrUndefined(this.tempClient.serviceNumber) && this.tempClient.serviceNumber.length > 0;
  }
}
