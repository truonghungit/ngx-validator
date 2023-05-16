import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { FormValidatorModule, FormValidatorConfig } from 'projects/ngx-validator/src/public-api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BootstrapComponent } from './bootstrap/bootstrap.component';

const formValidatorConfig: FormValidatorConfig = {
}

@NgModule({
  declarations: [
    AppComponent,
    BootstrapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,

    FormValidatorModule.configure(formValidatorConfig)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
