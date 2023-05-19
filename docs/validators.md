# Validators

## Table of Contents

- [Wrapped angular built-in validators](#wrapped-angular-built-in-validators)
  - [min](#min)
  - [max](#max)
  - [required](#required)
  - [requiredTrue](#requiredTrue)
  - [email](#email)
  - [minLength](#minLength)
  - [maxLength](#maxLength)
  - [pattern](#pattern)
- [Additional Validators](#additional-validators)
  - [range](#range)
  - [url](#url)


## Wrapped angular built-in validators

Wrapped angular built-in validators, that help we can pass the custom validation message to the validator function when creating the form control

See more details in the [Angular docs](https://angular.io/api/forms/Validators)

### min

Validator that requires the control's value to be greater than or equal to the provided number.

`min(min: number, message: string): ValidatorFn`

#### Parameters

| Name    | Type   |
| ------- | ------ |
| min     | number |
| message | string |

#### Usage:

```typescript
import { min } from '@popeyelab/ngx-validator';

// ...
const control = new FormControl(2, [min(10, 'Value should be greater than or equal to 10')]);
console.log(control.errors); // {min: {min: 10, actual: 2, message: 'Value should be greater than or equal to 10'}}
```

### max

Validator that requires the control's value to be less than or equal to the provided number.

`max(max: number, message: string): ValidatorFn`

#### Parameters

| Name    | Type   |
| ------- | ------ |
| max     | number |
| message | string |

#### Usage:

```typescript
import { max } from '@popeyelab/ngx-validator';

// ...
const control = new FormControl(20, max(10, 'Value should be less than or equal to 10'));
console.log(control.errors); // {max: {max: 10, actual: 20, message: 'Value should be less than or equal to 10'}}
```

### required

Validator that requires the control have a non-empty value.

`required(message: string): ValidatorFn`

#### Parameters

| Name    | Type   |
| ------- | ------ |
| message | string |

#### Usage:

```typescript
import { required } from '@popeyelab/ngx-validator';

// ...
const control = new FormControl('', required('This field is required'));
console.log(control.errors); // {required: {message: 'This field is required'}}
```

### requiredTrue

Validator that requires the control's value be true. This validator is commonly used for required checkboxes.
`requiredTrue(message: string): ValidatorFn`

#### Parameters

| Name    | Type   |
| ------- | ------ |
| message | string |

#### Usage:

```typescript
import { requiredTrue } from '@popeyelab/ngx-validator';

// ...
const control = new FormControl(false, requiredTrue('This field is required'));
console.log(control.errors); // {required: {message: 'This field is required'}}
```

### email

Validator that requires the control's value pass an email validation test.
`email(message: string): ValidatorFn`

#### Parameters

| Name    | Type   |
| ------- | ------ |
| message | string |

#### Usage:

```typescript
import { email } from '@popeyelab/ngx-validator';

// ...
const control = new FormControl('example email', email('This email is invalid'));
console.log(control.errors); // {email: {message: 'This email is invalid'}}
```

### minLength

Validator that requires the length of the control's value to be greater than or equal to the provided minimum length.
`minLength(minLength: number, message: string): ValidatorFn`

#### Parameters

| Name      | Type   |
| --------- | ------ |
| minLength | number |
| message   | string |

#### Usage:

```typescript
import { minLength } from '@popeyelab/ngx-validator';
// ...

const control = new FormControl('hello', minLength(10, 'Should have at least 10 characters'));
console.log(control.errors); // {minlength: {requiredLength: 10, actualLength: 5, message: 'Should have at least 10 characters'}}
```

### maxLength

Validator that requires the length of the control's value to be less than or equal to the provided maximum length.
`maxLength(maxLength: number, message: string): ValidatorFn`

#### Parameters

| Name      | Type   |
| --------- | ------ |
| maxLength | number |
| message   | string |

#### Usage:

```typescript
import { maxLength } from '@popeyelab/ngx-validator';
// ...

const control = new FormControl('hello world', maxLength(10, 'The max length of 10 characters is reached'));
console.log(control.errors); // {maxlength: {requiredLength: 10, actualLength: 11, message: 'The max length of 10 characters is reached'}}
```

### pattern

Validator that requires the control's value to match a regex pattern.
`pattern(pattern: string | RegExp, message: string): ValidatorFn`

#### Parameters

| Name    | Type   |
| ------- | ------ | ------ |
| pattern | string | RegExp |
| message | string |

#### Usage:

```typescript
import { pattern } from '@popeyelab/ngx-validator';
// ...

const onlyNumber = /^[0-9]+$/;
const control = new FormControl('Hello', pattern(onlyNumber, 'Please input numeric characters only'));

console.log(control.errors); // {pattern: {requiredPattern: '/^[0-9]+$/', actualValue: 'Hello', message: 'Please input numeric characters only'}}
```

## Additional Validators

Provides a set of common validators that can be used by form controls.

### range

Validator that requires the control's value to be in the provided range

`range(range: [number, number], message: string): ValidatorFn`

#### Parameters

| Name    | Type             |
| ------- | ---------------- |
| range   | [number, number] |
| message | string           |

#### Usage:

```typescript
import { range } from '@popeyelab/ngx-validator';

// ...
const [min, max] = [0, 10];
const control = new FormControl(11, range([min, max], 'Value should be in the range of 0 to 10'));
console.log(control.errors); // {range: {range: [0, 10], actual: 11,  message: 'Value should be in the range of 0 to 10'}}
```

### url

Validator that requires the control's value pass an URL.
`url(message?: string): ValidatorFn`

#### Parameters

| Name    | Type   |
| ------- | ------ |
| message | string |

#### Usage:

```typescript
import { url } from '@popeyelab/ngx-validator';

// ...
const control = new FormControl('example url', url('Invalid URL'));
console.log(control.errors); // {url: {message: 'Invalid URL'}}
```
