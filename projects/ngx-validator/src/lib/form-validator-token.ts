import { InjectionToken } from '@angular/core';
import { FormValidatorConfig } from './models';

export const FORM_VALIDATOR_CONFIGURATION = new InjectionToken<FormValidatorConfig>('Ngx form validator configuration');
