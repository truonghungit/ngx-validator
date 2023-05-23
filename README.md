# Angular Form Validator

[![GitHub](https://img.shields.io/github/license/truonghungit/ngx-validator)](./LICENSE)
[![commitizen](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)]()
[![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)]()
[![release](https://github.com/truonghungit/ngx-validator/actions/workflows/release.yml/badge.svg)](https://github.com/truonghungit/ngx-validator/actions/workflows/release.yml)
[![npm](https://img.shields.io/npm/v/@popeyelab/ngx-validator)](https://www.npmjs.com/package/@popeyelab/ngx-validator)
[![npm](https://img.shields.io/npm/dw/@popeyelab/ngx-validator)]()

Get validation messages with zero coding in less than 30 seconds (seriously)

Created by Angular developer for Angular developers with ❤️.

## Table of Contents

- [Why](#why)
- [Demo](https://ngx-validator-showcase.vercel.app/)
- [Quick Start](#quick-start)
- [Validation Messages](#validation-messages)
- [Validators](#validators)
- [Changelog](#changelog)
- [License](#license)

## Why

### Without **@popeyelab/ngx-validator**

To declarative validation error messages for reactive forms. Typically you'd do something like this:

```html
<form [formGroup]="form" #ngForm="ngForm">
  <div>
    <label>Your Name</label>
    <input type="text" formControlName="name" />

    <div *ngIf="form.controls['name'].invalid && ((form.controls['name'].dirty && form.controls['name'].touched) || ngForm.submitted)">
      <div *ngIf="form.controls['name'].hasError('required')">Name is required</div>
    </div>
  </div>

  <div>
    <label>Email Address</label>
    <input type="email" formControlName="email" />

    <div *ngIf="form.controls['email'].invalid && ((form.controls['email'].dirty && form.controls['email'].touched) || ngForm.submitted)">
      <div *ngIf="form.controls['email'].hasError('required')">Email is required</div>
      <div *ngIf="form.controls['email'].hasError('email')">Email is invalid</div>
    </div>
  </div>

  <div>
    <label>Password</label>
    <input type="password" formControlName="password" />
    <div *ngIf="form.controls['password'].invalid && ((form.controls['password'].dirty && form.controls['password'].touched) || ngForm.submitted)">
      <div *ngIf="form.controls['password'].hasError('required')">Password is required</div>
      <div *ngIf="form.controls['password'].hasError('minlength')">Password should have at least 6 characters</div>
    </div>
  </div>

  <div>
    <label>Confirm Password</label>
    <input type="password" formControlName="confirmPassword" />
    <div *ngIf="form.controls['confirmPassword'].invalid && ((form.controls['confirmPassword'].dirty && form.controls['confirmPassword'].touched ) || ngForm.submitted)">
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

[Back to top](#table-of-contents)

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
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, ReactiveFormsModule, FormValidatorModule, AppRoutingModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
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
  styleUrls: ['./app.component.scss'],
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

[Back to top](#table-of-contents)

## Validation Messages

The library will capture the error (`error: ValidationErrors`) from the from control, then show the validation messages to UI based on the default validation messages as bellow.

| Error         | Message                                               |
| ------------- | ----------------------------------------------------- |
| required      | This field is required                                |
| email         | Email is invalid                                      |
| max           | Value should be less than or equal to {{ max }}.      |
| min           | Value should be greater than or equal to {{ min }}.   |
| maxlength     | {{ requiredLength }} characters are allowed.          |
| minlength     | Should have at least {{ requiredLength }} characters. |
| pattern       | Invalid pattern. Please review your input.            |
| range         | Value should be in the range of {{ range }}           |
| url           | URL is invalid.                                       |
| unknown error | [This field is invalid]                               |

### Custom validation Messages

We have the following options for changing the validation message:

#### Option 1: Use form validation configuration

```typescript
import { FormValidatorModule, FormValidatorConfig } from '@popeyelab/ngx-validator';

const formValidatorConfig: Partial<FormValidatorConfig> = {
  validationMessages: {
    required: 'This field is required.',
    email: 'Email is invalid',
    max: 'Value should be less than or equal to {{ max }}.',
    maxlength: '{{ requiredLength }} characters are allowed.',
    min: 'Value should be greater than or equal to {{ min }}.',
    minlength: 'Should have at least {{ requiredLength }} characters.',
    pattern: 'Invalid pattern. Please review your input.',
    range: 'Value should be in the range of {{ range }}',
    url: 'URL is invalid.',
  },
};

@NgModule({
  imports: [
    // ...
    FormValidatorModule.configure(formValidatorConfig),
  ],
})
export class AppModule {}
```

#### Option 2: Use `validationMessages` input of `FormControlValidatorDirective`

_app.component.html_

```html
<form [formGroup]="form">
  <div>
    <label>Your Name</label>
    <input type="text" formControlName="name" [validationMessages]="{required: 'Please enter your name'}" />
  </div>

  <div>
    <label>Email Address</label>
    <input type="email" formControlName="email" [validationMessages]="{required: 'Please enter your email', email: 'Please enter valid email'}" />
  </div>
</form>
```

#### Option 3: Pass validation messages to validator function

Default Angular build-in validator functions does not support passing validation messages, so you should use the wrapped validator functions from `@popeyelab/ngx-validator`;

_app.component.ts_

```typescript
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { required, equalTo, email } from '@popeyelab/ngx-validator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  form = new FormGroup({
    name: new FormControl('', [required('Please enter your name')]),
    email: new FormControl('', [required('Please enter your email'), email('Email is invalid')]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required, equalTo('password', 'Confirm password does not match')]),
  });
}
```

### Custom Validation Messages for Your Custom Validator

If you have a custom validator, that returns an error like the example bellow

```typescript
function color(color: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return control.value?.toLowerCase() === color ? null : { wrongColor: { requiredColor: color, actual: control.value } };
  };
}

//...
const control = new FormControl('green', color('blue'));
```

You can also add the validation message for custom form validator by

#### Option 1: Use form validation configuration

```typescript
import { FormValidatorConfig } from '@popeyelab/ngx-validator';

const formValidatorConfig: Partial<FormValidatorConfig> = {
  validationMessages: {
    // ...
    wrongColor: 'Invalid color',
  },
};
```

#### Option 2: Use `validationMessages` input of `FormControlValidatorDirective`

_app.component.html_

```html
<form [formGroup]="form">
  <div>
    <label>Your Color</label>
    <input type="text" formControlName="color" [validationMessages]="{wrongColor: 'Invalid color'}" />
  </div>
</form>
```

#### Option 3: Return error message in your custom validator function

_app.component.html_

```typescript
function color(color: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return control.value?.toLowerCase() === color
      ? null
      : {
          wrongColor: {
            requiredColor: color,
            actual: control.value,
            message: 'Invalid color'
          },
        };
  };
}
```

[Back to top](#table-of-contents)

## Validators

### Angular built-in validators

Wrapped angular built-in validators, that help we can pass the custom validation message to the validator function when creating the form control

See more details in the [Angular docs](https://angular.io/api/forms/Validators)

#### min

Validator that requires the control's value to be greater than or equal to the provided number.

`min(min: number, message: string): ValidatorFn`

##### Parameters

| Name    | Type   |
| ------- | ------ |
| min     | number |
| message | string |

##### Usage:

```typescript
import { min } from '@popeyelab/ngx-validator';

// ...
const control = new FormControl(2, [min(10, 'Value should be greater than or equal to 10')]);
console.log(control.errors); // {min: {min: 10, actual: 2, message: 'Value should be greater than or equal to 10'}}
```

#### max

Validator that requires the control's value to be less than or equal to the provided number.

`max(max: number, message: string): ValidatorFn`

##### Parameters

| Name    | Type   |
| ------- | ------ |
| max     | number |
| message | string |

##### Usage:

```typescript
import { max } from '@popeyelab/ngx-validator';

// ...
const control = new FormControl(20, max(10, 'Value should be less than or equal to 10'));
console.log(control.errors); // {max: {max: 10, actual: 20, message: 'Value should be less than or equal to 10'}}
```

#### required

Validator that requires the control have a non-empty value.

`required(message: string): ValidatorFn`

##### Parameters

| Name    | Type   |
| ------- | ------ |
| message | string |

##### Usage:

```typescript
import { required } from '@popeyelab/ngx-validator';

// ...
const control = new FormControl('', required('This field is required'));
console.log(control.errors); // {required: {message: 'This field is required'}}
```

#### requiredTrue

Validator that requires the control's value be true. This validator is commonly used for required checkboxes.
`requiredTrue(message: string): ValidatorFn`

##### Parameters

| Name    | Type   |
| ------- | ------ |
| message | string |

##### Usage:

```typescript
import { requiredTrue } from '@popeyelab/ngx-validator';

// ...
const control = new FormControl(false, requiredTrue('This field is required'));
console.log(control.errors); // {required: {message: 'This field is required'}}
```

#### email

Validator that requires the control's value pass an email validation test.
`email(message: string): ValidatorFn`

##### Parameters

| Name    | Type   |
| ------- | ------ |
| message | string |

##### Usage:

```typescript
import { email } from '@popeyelab/ngx-validator';

// ...
const control = new FormControl('example email', email('This email is invalid'));
console.log(control.errors); // {email: {message: 'This email is invalid'}}
```

#### minLength

Validator that requires the length of the control's value to be greater than or equal to the provided minimum length.
`minLength(minLength: number, message: string): ValidatorFn`

##### Parameters

| Name      | Type   |
| --------- | ------ |
| minLength | number |
| message   | string |

##### Usage:

```typescript
import { minLength } from '@popeyelab/ngx-validator';
// ...

const control = new FormControl('hello', minLength(10, 'Should have at least 10 characters'));
console.log(control.errors); // {minlength: {requiredLength: 10, actualLength: 5, message: 'Should have at least 10 characters'}}
```

#### maxLength

Validator that requires the length of the control's value to be less than or equal to the provided maximum length.
`maxLength(maxLength: number, message: string): ValidatorFn`

##### Parameters

| Name      | Type   |
| --------- | ------ |
| maxLength | number |
| message   | string |

##### Usage:

```typescript
import { maxLength } from '@popeyelab/ngx-validator';
// ...

const control = new FormControl('hello world', maxLength(10, 'The max length of 10 characters is reached'));
console.log(control.errors); // {maxlength: {requiredLength: 10, actualLength: 11, message: 'The max length of 10 characters is reached'}}
```

#### pattern

Validator that requires the control's value to match a regex pattern.
`pattern(pattern: string | RegExp, message: string): ValidatorFn`

##### Parameters

| Name    | Type   |
| ------- | ------ | ------ |
| pattern | string | RegExp |
| message | string |

##### Usage:

```typescript
import { pattern } from '@popeyelab/ngx-validator';
// ...

const onlyNumber = /^[0-9]+$/;
const control = new FormControl('Hello', pattern(onlyNumber, 'Please input numeric characters only'));

console.log(control.errors); // {pattern: {requiredPattern: '/^[0-9]+$/', actualValue: 'Hello', message: 'Please input numeric characters only'}}
```

### Additional Validators

Provides a set of common validators that can be used by form controls.

#### range

Validator that requires the control's value to be in the provided range

`range(range: [number, number], message: string): ValidatorFn`

##### Parameters

| Name    | Type             |
| ------- | ---------------- |
| range   | [number, number] |
| message | string           |

##### Usage:

```typescript
import { range } from '@popeyelab/ngx-validator';

// ...
const [min, max] = [0, 10];
const control = new FormControl(11, range([min, max], 'Value should be in the range of 0 to 10'));
console.log(control.errors); // {range: {range: [0, 10], actual: 11,  message: 'Value should be in the range of 0 to 10'}}
```

#### url

Validator that requires the control's value pass an URL.
`url(message?: string): ValidatorFn`

##### Parameters

| Name    | Type   |
| ------- | ------ |
| message | string |

##### Usage:

```typescript
import { url } from '@popeyelab/ngx-validator';

// ...
const control = new FormControl('example url', url('Invalid URL'));
console.log(control.errors); // {url: {message: 'Invalid URL'}}
```

### equal

Validator that requires the control's value equal to the provided value.
`equal(value: string, message?: string): ValidatorFn`

##### Parameters

| Name    | Type   |
| ------- | ------ |
| value   | string |
| message | string |

##### Usage:

```typescript
import { equal } from '@popeyelab/ngx-validator';

// ...
const control = new FormControl('hello', equal('hello world', 'Value should be equal to hello world'));
```

### equalTo

Validator that requires the control's value equal to the value of provided control.
`equalTo(controlNamePath: string, message?: string): ValidatorFn`

##### Parameters

| Name            | Type   |
| --------------- | ------ |
| controlNamePath | string |
| message         | string |

##### Usage:

```typescript
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { equalTo } from '@popeyelab/ngx-validator';

// ...

form = new FormGroup({
  password: new FormControl(''),
  confirmPassword: new FormControl('', [equalTo('password', 'Confirm Password does not match')]),
});
```

[Back to top](#table-of-contents)

## Changelog

See the [release page](https://github.com/truonghungit/ngx-validator/releases).

## License

This project is released under the [MIT](./LICENSE)
