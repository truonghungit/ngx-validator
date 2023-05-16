import { Type } from '@angular/core';
import { ErrorMessage } from './error-message';
import { BaseValidationMessagesComponent } from '../components';

export enum FormEventType {
  FormInitial = 'FORM_INITIAL',
  ValueChange = 'VALUE_CHANGES',
  StatusChange = 'STATUS_CHANGES',
  FormSubmit = 'FORM_SUBMIT',
  Blur = 'BLUR',
}

export interface FormEvent {
  type: FormEventType;
  value?: any;
}

export const enum UIFramework {
  Bootstrap = 'bootstrap',
  AngularMaterial = 'angular-material',
  Auto = 'auto',
  None = 'none',
}

export interface FormValidatorConfig {
  skipValidate?: boolean;
  uiFrameWork?: UIFramework | 'default' | 'auto';
  defaultErrorMessage?: ErrorMessage;
  unknownErrorMessage?: string;
  validationMessagesComponent?: Type<BaseValidationMessagesComponent>;
  validateOn?: (status: {
    dirty: boolean;
    touched: boolean;
    submited: boolean;
  }) => boolean;
}
