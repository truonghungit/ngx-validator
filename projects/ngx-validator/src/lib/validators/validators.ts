import {
  Validators as NgValidators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

const URL_REGEXP = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;

function isObject(arg: any): boolean {
  return arg !== null && typeof arg === 'object' && !Array.isArray(arg);
}

function validate(
  validatorFn: ValidatorFn,
  validatorKey: string,
  control: AbstractControl,
  message: string
): ValidationErrors | null {
  const validationErrors = validatorFn(control);

  if (message) {
    if (validationErrors?.[validatorKey]) {
      if (!isObject(validationErrors[validatorKey])) {
        validationErrors[validatorKey] = {};
      }

      validationErrors[validatorKey].message = message;
    }
  }

  return validationErrors;
}

function isEmptyInputValue(value: any): boolean {
  /**
   * Check if the object is a string or array before evaluating the length attribute.
   * This avoids falsely rejecting objects that contain a custom length attribute.
   * For example, the object {id: 1, length: 0, width: 0} should not be returned as empty.
   */
  return (
    value == null ||
    ((typeof value === 'string' || Array.isArray(value)) && value.length === 0)
  );
}

/**
 * @description
 * Validator that requires the control's value to be greater than or equal to the provided number.
 *
 * @usageNotes
 *
 * ### Validate against a minimum of 3
 *
 * ```typescript
 * const control = new FormControl(2, min(3));
 *
 * console.log(control.errors); // {min: {min: 3, actual: 2}}
 * ```
 *
 * @returns A validator function that returns an error map with the
 * `min` property if the validation check fails, otherwise `null`.
 *
 */
export function min(min: number, message: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return validate(NgValidators.min(min), 'min', control, message);
  };
}

/**
 * @description
 * Validator that requires the control's value to be less than or equal to the provided number.
 *
 * @usageNotes
 *
 * ### Validate against a maximum of 15
 *
 * ```typescript
 * const control = new FormControl(16, max(15));
 *
 * console.log(control.errors); // {max: {max: 15, actual: 16}}
 * ```
 *
 * @returns A validator function that returns an error map with the
 * `max` property if the validation check fails, otherwise `null`.
 *
 */
export function max(max: number, message: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return validate(NgValidators.max(max), 'max', control, message);
  };
}

/**
 * @description
 * Validator that requires the control have a non-empty value.
 *
 * @usageNotes
 *
 * ### Validate that the field is non-empty
 *
 * ```typescript
 * const control = new FormControl('', Validators.required('This field is required'));
 *
 * console.log(control.errors); // {required: {message: 'This field is required'}}
 * ```
 *
 * @returns An error map with the `required` property
 * if the validation check fails, otherwise `null`.
 *
 *
 */

export function required(message: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return validate(NgValidators.required, 'required', control, message);
  };
}

/**
 * @description
 * Validator that requires the control's value be true. This validator is commonly
 * used for required checkboxes.
 *
 * @usageNotes
 *
 * ### Validate that the field value is true
 *
 * ```typescript
 * const control = new FormControl('some value', Validators.requiredTrue('This field is required'));
 *
 * console.log(control.errors); // {required: {message: 'This field is required'}}
 * ```
 *
 * @returns An error map that contains the `required` property
 * set to `true` if the validation check fails, otherwise `null`.
 *
 *
 */

export function requiredTrue(message: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return validate(NgValidators.requiredTrue, 'required', control, message);
  };
}

/**
 * @description
 * Validator that requires the control's value pass an email validation test.
 *
 * Tests the value using a [regular
 * expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)
 * pattern suitable for common use cases. The pattern is based on the definition of a valid email
 * address in the [WHATWG HTML
 * specification](https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address) with
 * some enhancements to incorporate more RFC rules (such as rules related to domain names and the
 * lengths of different parts of the address).
 *
 * The differences from the WHATWG version include:
 * - Disallow `local-part` (the part before the `@` symbol) to begin or end with a period (`.`).
 * - Disallow `local-part` to be longer than 64 characters.
 * - Disallow the whole address to be longer than 254 characters.
 *
 * If this pattern does not satisfy your business needs, you can use `Validators.pattern()` to
 * validate the value against a different pattern.
 *
 * @usageNotes
 *
 * ### Validate that the field matches a valid email pattern
 *
 * ```typescript
 * const control = new FormControl('bad@', Validators.email);
 *
 * console.log(control.errors); // {email: {message: 'Invalid email'}}
 * ```
 *
 * @returns An error map with the `email` property
 * if the validation check fails, otherwise `null`.
 *
 */
export function email(message: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return validate(NgValidators.email, 'email', control, message);
  };
}

/**
 * @description
 * Validator that requires the length of the control's value to be greater than or equal
 * to the provided minimum length. This validator is also provided by default if you use the
 * the HTML5 `minlength` attribute. Note that the `minLength` validator is intended to be used
 * only for types that have a numeric `length` property, such as strings or arrays. The
 * `minLength` validator logic is also not invoked for values when their `length` property is 0
 * (for example in case of an empty string or an empty array), to support optional controls. You
 * can use the standard `required` validator if empty values should not be considered valid.
 *
 * @usageNotes
 *
 * ### Validate that the field has a minimum of 3 characters
 *
 * ```typescript
 * const control = new FormControl('ng', Validators.minLength(3));
 *
 * console.log(control.errors); // {minlength: {requiredLength: 3, actualLength: 2}}
 * ```
 *
 * ```html
 * <input minlength="5">
 * ```
 *
 * @returns A validator function that returns an error map with the
 * `minlength` property if the validation check fails, otherwise `null`.
 *
 * @see `updateValueAndValidity()`
 *
 */
export function minLength(minLength: number, message: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return validate(
      NgValidators.minLength(minLength),
      'minlength',
      control,
      message
    );
  };
}

/**
 * @description
 * Validator that requires the length of the control's value to be less than or equal
 * to the provided maximum length. This validator is also provided by default if you use the
 * the HTML5 `maxlength` attribute. Note that the `maxLength` validator is intended to be used
 * only for types that have a numeric `length` property, such as strings or arrays.
 *
 * @usageNotes
 *
 * ### Validate that the field has maximum of 5 characters
 *
 * ```typescript
 * const control = new FormControl('Angular', Validators.maxLength(5));
 *
 * console.log(control.errors); // {maxlength: {requiredLength: 5, actualLength: 7}}
 * ```
 *
 * ```html
 * <input maxlength="5">
 * ```
 *
 * @returns A validator function that returns an error map with the
 * `maxlength` property if the validation check fails, otherwise `null`.
 *
 * @see `updateValueAndValidity()`
 *
 */
export function maxLength(maxLength: number, message: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return validate(
      NgValidators.maxLength(maxLength),
      'maxlength',
      control,
      message
    );
  };
}

/**
 * @description
 * Validator that requires the control's value to match a regex pattern. This validator is also
 * provided by default if you use the HTML5 `pattern` attribute.
 *
 * @usageNotes
 *
 * ### Validate that the field only contains letters or spaces
 *
 * ```typescript
 * const control = new FormControl('1', Validators.pattern('[a-zA-Z ]*'));
 *
 * console.log(control.errors); // {pattern: {requiredPattern: '^[a-zA-Z ]*$', actualValue: '1'}}
 * ```
 *
 * ```html
 * <input pattern="[a-zA-Z ]*">
 * ```
 *
 * ### Pattern matching with the global or sticky flag
 *
 * `RegExp` objects created with the `g` or `y` flags that are passed into `Validators.pattern`
 * can produce different results on the same input when validations are run consecutively. This is
 * due to how the behavior of `RegExp.prototype.test` is
 * specified in [ECMA-262](https://tc39.es/ecma262/#sec-regexpbuiltinexec)
 * (`RegExp` preserves the index of the last match when the global or sticky flag is used).
 * Due to this behavior, it is recommended that when using
 * `Validators.pattern` you **do not** pass in a `RegExp` object with either the global or sticky
 * flag enabled.
 *
 * ```typescript
 * // Not recommended (since the `g` flag is used)
 * const controlOne = new FormControl('1', Validators.pattern(/foo/g));
 *
 * // Good
 * const controlTwo = new FormControl('1', Validators.pattern(/foo/));
 * ```
 *
 * @param pattern A regular expression to be used as is to test the values, or a string.
 * If a string is passed, the `^` character is prepended and the `$` character is
 * appended to the provided string (if not already present), and the resulting regular
 * expression is used to test the values.
 *
 * @returns A validator function that returns an error map with the
 * `pattern` property if the validation check fails, otherwise `null`.
 *
 * @see `updateValueAndValidity()`
 *
 */
export function pattern(pattern: string | RegExp, message: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return validate(NgValidators.pattern(pattern), 'pattern', control, message);
  };
}

export function range(range: [number, number], message?: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (isEmptyInputValue(control.value) || isEmptyInputValue(range)) {
      return null; // don't validate empty values to allow optional controls
    }

    const [min, max] = range;
    const value = parseFloat(control.value);

    if (isNaN(value)) {
      return null;
    }

    return value < min || value > max
      ? { range: { range, message, actual: control.value } }
      : null;
  };
}

export function url(message?: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (isEmptyInputValue(control.value) || isEmptyInputValue(range)) {
      return null; // don't validate empty values to allow optional controls
    }

    return URL_REGEXP.test(control.value) ? null : { url: { message } };
  };
}

export function equal(value: any, message?: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (isEmptyInputValue(control.value) || isEmptyInputValue(value)) {
      return null; // don't validate empty values to allow optional controls
    }

    return value === control.value
      ? null
      : { equal: { requiredValue: value, actual: control.value, message } };
  };
};

export function equalTo(controlNamePath: string, message?: string): ValidatorFn {
  let subscribe: boolean = false;

  return (control: AbstractControl): ValidationErrors | null => {
    const equalControl = control.root.get(controlNamePath);

    if (isEmptyInputValue(control.value) || isEmptyInputValue(controlNamePath) || !equalControl) {
      return null; // don't validate empty values to allow optional controls
    }

    if (!subscribe) {
      subscribe = true;
      equalControl.valueChanges.subscribe(() => {
        control.updateValueAndValidity();
      });
    };

    return equalControl.value === control.value
      ? null
      : { equalTo: { requiredValue: equalControl.value, actual: control.value, message } };
  }
}

export function noWhitespace(message?: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return (control.value || '').trim().length ? null : { whitespace: { message } };
  };
}
