import { Type } from '@angular/core';
import { BaseValidationMessagesComponent } from './components';

export interface ValidationMessages {
  [key: string]: string;
}

export interface FormatedError {
  key: string;
  message: string;
}

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

export type ValidateOnFn = (status: { dirty: boolean; touched: boolean; submited: boolean }) => boolean;

export interface FormValidatorConfig {
  skipValidate?: boolean;
  uiFrameWork?: UIFramework | 'default' | 'auto';
  validationMessages?: ValidationMessages;
  unknownErrorValidationMessage?: string;
  validationMessagesComponent?: Type<BaseValidationMessagesComponent>;
  validateOn?: ValidateOnFn;
}
