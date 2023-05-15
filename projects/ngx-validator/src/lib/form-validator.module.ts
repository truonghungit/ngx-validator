import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormValidatorConfig } from './models';
import { FORM_VALIDATOR_CONFIGURATION } from './form-validator-token';
import { DefaultValidationMessagesComponent } from './components';
import { FormGroupValidatorDirective, FormControlValidatorDirective } from './directives';

export const defaultFormValidationConfig: FormValidatorConfig = {
  skipValidate: false,
  validateOn: ({ dirty, touched, submited }) => {
    return (dirty && touched) || submited;
  },
  unknownErrorMessage: '[This field is invalid]',
  defaultErrorMessage: {
    required: 'This field is required.',
    email: 'Email is invalid',
    max: 'Value should be less than or equal to {{ max }}.',
    maxlength: '{{ requiredLength }} characters are allowed.',
    min: 'Value should be greater than or equal to {{ min }}.',
    minlength: 'Should have at least {{ requiredLength }} characters.',
    pattern: 'Invalid pattern. Please review your input.',
  }
}

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    FormGroupValidatorDirective,
    FormControlValidatorDirective,
    DefaultValidationMessagesComponent,
  ],
  providers: [
    {
      provide: FORM_VALIDATOR_CONFIGURATION,
      useValue: defaultFormValidationConfig
    }
  ],
  exports: [
    FormGroupValidatorDirective,
    FormControlValidatorDirective
  ],
})
export class FormValidatorModule {
  static configure(config: Partial<FormValidatorConfig>): ModuleWithProviders<FormValidatorModule> {
    const formValidationConfig = { ...defaultFormValidationConfig, ...config };

    return {
      ngModule: FormValidatorModule,
      providers: [
        {
          provide: FORM_VALIDATOR_CONFIGURATION,
          useValue: formValidationConfig
        }
      ],
    };
  }
}
