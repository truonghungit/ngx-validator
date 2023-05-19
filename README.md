# Angular Form Validator

Get validation messages with zero coding in less than 30 seconds (seriously)

Created by Angular developer for Angular developers with ❤️.

## Why @popeyelab/ngx-validator

### Without **@popeyelab/ngx-validator**

To declarative validation error messages for reactive forms. Typically you'd do something like this:

```html
<form [formGroup]="form" #ngForm="ngForm">
  <div>
    <label>Your Name</label>
    <input type="text" formControlName="name" />

    <div
      *ngIf="form.controls['name'].invalid && ((form.controls['name'].dirty && form.controls['name'].touched) || ngForm.submitted)">
      <div *ngIf="form.controls['name'].hasError('required')">Name is required</div>
    </div>
  </div>

  <div>
    <label>Email Address</label>
    <input type="email" formControlName="email" />

    <div
      *ngIf="form.controls['email'].invalid && ((form.controls['email'].dirty && form.controls['email'].touched) || ngForm.submitted)">
      <div *ngIf="form.controls['email'].hasError('required')">Email is required</div>
      <div *ngIf="form.controls['email'].hasError('email')">Email is invalid</div>
    </div>
  </div>

  <div>
    <label>Password</label>
    <input type="password" formControlName="password" />
    <div
      *ngIf="form.controls['password'].invalid && ((form.controls['password'].dirty && form.controls['password'].touched) || ngForm.submitted)">
      <div *ngIf="form.controls['password'].hasError('required')">Password is required</div>
      <div *ngIf="form.controls['password'].hasError('minlength')">Password should have at least 6 characters</div>
    </div>
  </div>

  <div>
    <label>Confirm Password</label>
    <input type="password" formControlName="confirmPassword" />
    <div
      *ngIf="form.controls['confirmPassword'].invalid && ((form.controls['confirmPassword'].dirty && form.controls['confirmPassword'].touched ) || ngForm.submitted)">
      <div *ngIf="form.controls['confirmPassword'].hasError('required')">Confirm password is required</div>
      <div *ngIf="form.controls['confirmPassword'].hasError('equalTo')">Confirm password not match</div>
    </div>
  </div>

  <div>
    <button type="submit">Submit</button>
  </div>
</form>
```

### With **@popeyelab/ngx-validator**, we don't need to do any things, it just simple like this

```html
<form [formGroup]="form">
  <div>
    <label>Your Name</label>
    <input type="text" formControlName="name" />
  </div>

  <div>
    <label>Email Address</label>
    <input type="email" formControlName="email" />
  </div>

  <div>
    <label>Password</label>
    <input type="password" formControlName="password" />
  </div>

  <div>
    <label>Confirm Password</label>
    <input type="password" formControlName="confirmPassword" />
  </div>

  <div>
    <button type="submit">Submit</button>
  </div>
</form>
```

## Quick Start

Follow these steps to get started with **Ngx Validator**.

> Actually we only install package then add the `FormValidatorModule` to your module

### 1. Install **@popeyelab/ngx-validator** package:

Installing with `npm`

```
npm install @popeyelab/ngx-validator --save
```

Installing with `yarn`

```
yarn add @popeyelab/ngx-validator
```

### 2. Add `FormValidatorModule` module to your module

_app.module.ts_

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { FormValidatorModule } from '@popeyelab/ngx-validator';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    BootstrapComponent,
    AngularMaterialComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormValidatorModule,

    AppRoutingModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

### 3. Define the form and validators

_app.component.ts_

```typescript
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { equalTo } from '@popeyelab/ngx-validator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required, equalTo('password')]),
  });
}

```

_app.component.html_

```html
<form [formGroup]="form">
  <div>
    <label>Your Name</label>
    <input type="text" formControlName="name" />
  </div>

  <div>
    <label>Email Address</label>
    <input type="email" formControlName="email" />
  </div>

  <div>
    <label>Password</label>
    <input type="password" formControlName="password" />
  </div>

  <div>
    <label>Confirm Password</label>
    <input type="password" formControlName="confirmPassword" />
  </div>

  <div>
    <button type="submit">Submit</button>
  </div>
</form>
```

> As you can see, we don't have to do anymore in html template. The `Ngx Validator` will know how to display the validation messages to the user interface.
