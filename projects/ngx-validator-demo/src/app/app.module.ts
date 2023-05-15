import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormValidatorModule, FormValidatorConfig } from 'projects/ngx-validator/src/public-api';
import { ReactiveFormsModule } from '@angular/forms';

const formValidatorConfig: FormValidatorConfig = {
  validateOn: ({ dirty, touched, submited }) => {
    return (dirty && touched) || submited;
  }
}

@NgModule({
  declarations: [
    AppComponent
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
