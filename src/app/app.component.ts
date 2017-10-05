import { Component } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {SharedService} from "./shared/shared.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: any;
  loggedIn: boolean;
  constructor(translate: TranslateService,
              public sharedService: SharedService) {

    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('et');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('et');
    this.sharedService.loggedIn = false;
    this.sharedService.title = 'header.returnTitle';
  }

}
