import { Component } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {SharedService} from "./shared/shared.service";
import {isNullOrUndefined} from "util";
import {Language} from "./shared/shared.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: any;
  loggedIn: boolean;
  startLang: any;
  constructor(translate: TranslateService,
              public sharedService: SharedService) {
    if (!isNullOrUndefined(this.startLang)) {
      translate.use(this.startLang);
    } else {
      // this language will be used as a fallback when a translation isn't found in the current language
      translate.setDefaultLang('et');

      // the lang to use, if the lang isn't available, it will use the current loader to get them
      translate.use('et');
    }

    this.sharedService.loggedIn = false;
    this.sharedService.title = 'header.returnTitle';
    this.sharedService.lang = new Language('EST', 'et');
    this.sharedService.successfullyReturned = false;
  }

}
