import { Component } from '@angular/core';
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

  constructor(translate: TranslateService,
              public sharedService: SharedService) {
    this.clients = [];
    this.clients.push(new BusinessClient(1,'24510','Test klient','J. V. Jannseni 28', 'Pärnu', '80010', 'EE', 'EE', 'LZ'));
    this.clients.push(new BusinessClient(2,'24510','Test klient','J. V. Jannseni 28', 'Pärnu', '80010', 'EE', 'LV', 'CI'));
    this.clients.push(new BusinessClient(3,'24510','Test klient','Ateities pl. 45B', 'Kaunas', '52119', 'LT', 'LT', 'CI'));
    this.clients.push(new BusinessClient(4,'7100009','Omniva SIA','Baltā iela 1B', 'Rīga', 'LV-1055', 'LV', 'LV', 'QH'));
    this.clients.push(new BusinessClient(5,'7100009','Omniva SIA','Baltā iela 1B', 'Rīga', 'LV-1055', 'LV', 'LV', 'QH'));
    this.clients.push(new BusinessClient(6,'7100009','Omniva SIA','Ateities pl. 45B', 'Kaunas', '52119', 'LT', 'LT', 'QH'));
    this.clients.push(new BusinessClient(7,'7002227','Omniva LT','Pallasti 28', 'Tallinn', '10001', 'EE', 'EE', 'QH'));
    this.clients.push(new BusinessClient(8,'7002227','Omniva LT','Baltā iela 1B', 'Rīga', 'LV-1055', 'LV', 'LV', 'QH'));
    this.clients.push(new BusinessClient(9,'7002227','Omniva LT','Ateities pl. 45B', 'Kaunas', '52119', 'LT', 'LT', 'QH'));
  }

}
