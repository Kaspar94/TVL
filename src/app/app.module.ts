import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {CustomerSideHeaderComponent} from './shared/header/header.component';
import {UserFormComponent} from './user-form/user-form.component';
import {FormsModule} from '@angular/forms';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {HttpClient, HttpHandler, HttpClientModule} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { AngularFontAwesomeModule } from 'angular-font-awesome/angular-font-awesome';
import {SharedService} from './shared/shared.service';
import {ClientViewComponent} from './client/view/client-view.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {Http, ConnectionBackend, HttpModule, Headers} from '@angular/http';
import {ClientEditComponent} from './client/edit/client-edit.component';
import {LoginComponent} from './shared/login/login.component';
import {ClientService} from './client/client.service';
import { SuccessComponent } from './user-form/success/success.component';
import {AlertService} from './shared/alert/alert.service';
import {ConfirmDialogComponent} from './client/confirm-dialog/confirm.dialog.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    CustomerSideHeaderComponent,
    UserFormComponent,
    ClientViewComponent,
    ClientEditComponent,
    LoginComponent,
    ConfirmDialogComponent,
    SuccessComponent
  ],
  imports: [
    HttpModule,
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
    }),
    NgbModule.forRoot()
  ],
  entryComponents: [ClientEditComponent, LoginComponent, ConfirmDialogComponent],
  providers: [SharedService, ClientService, AlertService],
  bootstrap: [AppComponent],
  exports: [ClientEditComponent, LoginComponent, ConfirmDialogComponent]
})
export class AppModule { }
