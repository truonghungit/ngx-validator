import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormValidatorConfig, UIFramework } from './form-validator.model';
import { FORM_VALIDATOR_CONFIGURATION } from './form-validator-token';
import { DefaultValidationMessagesComponent } from './components';
import {
  FormControlValidatorDirective,
  FormGroupValidatorDirective,
  MatFormFieldDirective,
  ValidatorContainerDirective,
  ValidatorTargetDirective
} from './directives';
import { MatValidationMessagesComponent } from './components/mat-validation-messages/mat-validation-messages.component';

export const defaultFormValidationConfig: FormValidatorConfig = {
  skipValidate: false,
  uiFrameWork: UIFramework.Auto,
  unknownErrorValidationMessage: '[This field is invalid]',
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
  validationMessagesComponent: DefaultValidationMessagesComponent,
  validateOn: ({ dirty, touched, submited }) => {
    return (dirty && touched) || submited;
  },
}

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DefaultValidationMessagesComponent,
    MatValidationMessagesComponent,
    FormControlValidatorDirective,
    FormGroupValidatorDirective,
    MatFormFieldDirective,
    ValidatorContainerDirective,
    ValidatorTargetDirective,
  ],
  providers: [
    {
      provide: FORM_VALIDATOR_CONFIGURATION,
      useValue: defaultFormValidationConfig
    }
  ],
  exports: [
    FormControlValidatorDirective,
    FormGroupValidatorDirective,
    MatFormFieldDirective,
    ValidatorContainerDirective,
    ValidatorTargetDirective,
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
