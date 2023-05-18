# Angular Form Validation

Get validation messages with zero coding in less than 30 seconds (seriously)

Created by Angular developer for Angular developers with ❤️.

## Table of contents

- [Why](#why)
- [Getting started](#getting-started)
- [Custom Configuration](#custom-configuration)

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

_example.component.ts_

```typescript
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss'],
})
export class ExampleComponent {
  form = this.formBuilder.group({
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
  });
  // ...

  constructor(private formBuilder: FormBuilder) {}
}
```

_example.component.html_

```html
<form (ngSubmit)="onSubmit()" [formGroup]="form">
  <div>
    <label for="email">Email address</label>
    <input type="email" id="email" formControlName="email" />
  </div>

  <div>
    <label for="firstName">First Name</label>
    <input type="text" id="firstName" formControlName="firstName" />
  </div>

  <div>
    <label for="lastName">Last Name</label>
    <input type="text" id="lastName" formControlName="lastName" />
  </div>

  <div>
    <button type="submit">Submit</button>
  </div>
</form>
```

> As you can see, we don't have to do anymore in example component. The `Ngx Validator` will know how to display the error messages to the user interface.

## Interfaces

### FormValidatorConfig

Object that can be used to configure the default options for the card module.

#### Properties

| Name                                                          | Description                           |
| ------------------------------------------------------------- | ------------------------------------- |
| skipValidate: boolean                                         | Skip valiate for this form group      |
| uiFrameWork: [UIFramework](#uiframework)                      |                                       |
| validateOn: [ValidateOnFn](#validateonfn)                     |                                       |
| validationMessages: [ValidationMessages](#validationmessages) | Defines the map of validation message |
| unknownErrorValidationMessage: string                         |                                       |

### UIFramework

```typescript
export const enum UIFramework {
  Bootstrap = 'bootstrap',
  AngularMaterial = 'angular-material',
  Auto = 'auto',
  None = 'none',
}
```

Default value is `UIFramework.Auto`. The library will automatically detect what is the UI framework is used.

### ValidateOnFn

Default the validation errors messages will be displayed when form control is `dirty` and `touched` or form is `submited`.
with `validateOn` function, we can customize when the validation errors messages will be displayed.

```typescript
export type ValidateOnFn = (status: { dirty: boolean; touched: boolean; submited: boolean }) => boolean;
```

Example:

````typescript
const formValidatorConfig: FormValidatorConfig = {
  validateOn: ({ dirty, touched, submited }) => {
    return dirty || touched || submited;
  }
}


### ValidationMessages

Defines the map of validation messages

```typescript
type ValidationErrors = {
    [key: string]: any;
};
````

Example:

```typescript
validationMessages: ValidationErrors = {
  required: 'This field is required.',
  email: 'Email is invalid',
  max: 'Value should be less than or equal to {{ max }}.',
  maxlength: '{{ requiredLength }} characters are allowed.',
  min: 'Value should be greater than or equal to {{ min }}.',
  minlength: 'Should have at least {{ requiredLength }} characters.',
  pattern: 'Invalid pattern. Please review your input.',
};
```

## Directives

### FormGroupValidatorDirective

Selector: `[formGroup],[formGroupName]`

Exported as: `formGroupValidator`

#### Properties

| Name                  | Description                      |
| --------------------- | -------------------------------- |
| @Input() skipValidate | Skip valiate for this form group |

### FormControlValidatorDirective

Selector: `[formControl],[formControlName]`

Exported as: `formControlValidator`

#### Properties

| Name                                            | Default value | Description                        |
| ----------------------------------------------- | ------------- | ---------------------------------- |
| @Input() skipValidate: boolean                  | false         | Skip valiate for this form control |
| @Input() validationMessages: ValidationMessages | null          | Custom validation messages         |
| @Input() validationMessagesTemplateRef          | null          | Custom validation                  |

## Validators

We wrap the build-in angular validator to allow passing the error message to the validator function.

### min()

Validator that requires the control's value to be greater than or equal to the provided number.

`min(min: number, message: string): ValidatorFn`

#### Parameters

| Name    | Type   |
| ------- | ------ |
| min     | number |
| message | string |

#### Examples:

```typescript
const control = new FormControl(2, min(10, 'Value should be greater than or equal to 10'));

console.log(control.errors); // {min: {min: 10, actual: 2, message: 'Value should be greater than or equal to 10'}}
```

### max()

Validator that requires the control's value to be less than or equal to the provided number.

`max(max: number, message: string): ValidatorFn`

#### Parameters

| Name    | Type   |
| ------- | ------ |
| max     | number |
| message | string |

#### Examples:

```typescript
const control = new FormControl(2, max(10, 'Value should be less than or equal to 10'));

console.log(control.errors); // {min: {max: 10, actual: 2, message: 'Value should be less than or equal to 10'}}
```
