# Angular Form Validation

Get validation messages with zero coding in less than 30 seconds (seriously)

Created by Angular developer for Angular developers with ❤️.

## Table of contents

* [Why](#why)
* [Getting started](#getting-started)
* [Custom Configuration](#custom-configuration)
## Why

### Without **@popeyelab/ngx-validator**

To declarative validation error messages for reactive forms. Typically you'd do something like this:

```html
<form [formGroup]="form">
  <div>
    <label>Email Address</label>
    <input type="text" formControlName="email" />

    <div *ngIf="form.get('email').invalid && (form.get('email').dirty || form.submitted))">
      <div ngIf="form.get('email').hasError('required')">Email is required</div>
      <div ngIf="form.get('email').hasError('email')">Email is invalid</div>
    </div>
  </div>

  <div>
    <label>Password</label>
    <input type="text" formControlName="password" />
    <div *ngIf="form.get('password').invalid && (form.get('password').dirty || form.submitted))">
      <div ngIf="form.get('password').hasError('required')">Password is required</div>
      <div ngIf="form.get('password').hasError('minlength')">Password should have at least 6 characters</div>
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
    <label>Email Address</label>
    <input type="text" formControlName="email" />
  </div>

  <div>
    <label>Password</label>
    <input type="text" formControlName="password" />
  </div>

  <div>
    <label>Confirm Password</label>
    <input type="text" formControlName="confirmPassword" />
  </div>

  <div>
    <button type="submit">Submit</button>
  </div>
</form>
```

## Getting Started

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

```typescript
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormValidatorModule } from '@popeyelab/ngx-validator';

import { ExampleComponent } from './example.component';

@NgModule({
  imports: [
    BrowserModule
    ReactiveFormsModule,
    // ...
    FormValidatorModule,
  ],
  declarations: [
    // ...
    ExampleComponent
  ]
  // ...
})
export class AppModule { }
```

### 3. Define the form and validation

*example.component.ts*

```typescript
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss']
})
export class ExampleComponent {
  form = this.formBuilder.group({
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]]
  });
  // ...

  constructor(private formBuilder: FormBuilder) { }
}
```

*example.component.html*
```html
<form (ngSubmit)="onSubmit()" [formGroup]="form">

  <div>
    <label for="email">Email address</label>
    <input type="email" id="email" formControlName="email">
  </div>

  <div>
    <label for="firstName">First Name</label>
    <input type="text" id="firstName" formControlName="firstName">
  </div>

  <div>
    <label for="lastName">Last Name</label>
    <input type="text" id="lastName" formControlName="lastName">
  </div>

  <div>
    <button type="submit">Submit</button>
  </div>
</form>
```
> As you can see, we don't have to do anymore in example component. The `Ngx Validator` will know how to display the error messages to the user interface.

## Custom Configuration

When import the FormValidatorModule module, we can also pass additional values to the function `configure` to modify the default configuration of the library
```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { FormValidatorModule, FormValidatorConfig } from '@popeyelab/ngx-validator';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

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

```

### Configuration Options
#### skipValidate
Default is `false`.

#### validateOn

Default the validation errors messages will be displayed when form control is `dirty` and `touched` or form is `submited`.
with `validateOn` function, we can customize when the validation errors messages will be displayed.

Example: 
```typescript
const formValidatorConfig: FormValidatorConfig = {
  validateOn: ({ dirty, touched, submited }) => {
    return dirty || touched || submited;
  }
}
```
