import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {CustomerSideHeaderComponent} from "./shared/header/header.component";
import {UserFormComponent} from "./user-form/user-form.component";
import {FormsModule} from "@angular/forms";
import {TranslateModule, TranslateLoader} from "@ngx-translate/core";
import {HttpClient, HttpHandler, HttpClientModule} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import { AngularFontAwesomeModule } from 'angular-font-awesome/angular-font-awesome'
import {SharedService} from "./shared/shared.service";
import {ClientViewComponent} from "./client/view/client-view.component";

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    CustomerSideHeaderComponent,
    UserFormComponent,
    ClientViewComponent
  ],
  imports: [
    BrowserModule,
    AngularFontAwesomeModule,
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
