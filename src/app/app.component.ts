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
  constructor(private translate: TranslateService,
              public sharedService: SharedService) {
    this.translate.setDefaultLang('en');
    this.findLang(window.location.search);
    if (isNullOrUndefined(this.sharedService.lang)) {
      this.findLang(window.navigator.language);
      if (isNullOrUndefined(this.sharedService.lang)) {
        // this language will be used as a fallback when a translation isn't found in the current language
        this.sharedService.lang = new Language('ENG', 'en');
        this.translate.use('en');
      }
    }
    this.sharedService.loggedIn = false;
    this.sharedService.title = 'header.returnTitle';
    this.sharedService.successfullyReturned = false;
  }

  findLang(searchParam) {
    if(searchParam.indexOf("ee") > -1 || searchParam.indexOf('est') > -1 || searchParam.indexOf('et') > -1){
      this.translate.use('et');
      this.sharedService.lang = new Language('EST', 'et');
      this.sharedService.deliveryCountry = 'EE';
    } else if(searchParam.indexOf("en") > -1 || searchParam.indexOf('eng') > -1){
      this.translate.use('en');
      this.sharedService.lang = new Language('ENG', 'en');
    } else if(searchParam.indexOf("lv") > -1 || searchParam.indexOf('lat') > -1){
      this.translate.use('lv');
      this.sharedService.lang = new Language('LAT', 'lv');
      this.sharedService.deliveryCountry = 'LV';
    } else if(searchParam.indexOf("ru") > -1 || searchParam.indexOf('rus') > -1){
      console.log("hello");
      this.translate.use('ru');
      this.sharedService.lang = new Language('RUS', 'ru');
    } else if(searchParam.indexOf("lt") > -1 || searchParam.indexOf('lit') > -1){
      this.translate.use('lt');
      this.sharedService.lang = new Language('LIT', 'lt');
      this.sharedService.deliveryCountry = 'LT';
    }
  }
}
