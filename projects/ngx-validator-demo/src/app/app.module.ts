import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { FormValidatorModule, FormValidatorConfig } from 'projects/ngx-validator/src/public-api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BootstrapComponent } from './bootstrap/bootstrap.component';
import { AngularMaterialComponent } from './angular-material/angular-material.component';

const formValidatorConfig: FormValidatorConfig = {
  validateOn: (status) => {
    return status.touched || status.submited;
  }
}

@NgModule({
  declarations: [
    AppComponent,
    BootstrapComponent,
    AngularMaterialComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,

    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,

    FormValidatorModule.configure(formValidatorConfig)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
