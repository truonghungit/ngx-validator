import { Type } from "@angular/core";
import { ErrorMessage } from "./error-message";
import { BaseValidationMessagesComponent as BaseValidationMessagesComponent } from "../components";

export enum FormEventType {
  FormInitial = 'FORM_INITIAL',
  ValueChange = 'VALUE_CHANGES',
  StatusChange = 'STATUS_CHANGES',
  FormSubmit = 'FORM_SUBMIT',
  Blur = 'BLUR'
}

export interface FormEvent {
  type: FormEventType;
  value?: any;
}

export interface FormValidatorConfig {
  skipValidate?: boolean;
  defaultErrorMessage?: ErrorMessage;
  unknownErrorMessage?: string;
  validationMessagesComponent?: Type<BaseValidationMessagesComponent>;
  validateOn?: (status: { dirty: boolean; touched: boolean; submited: boolean }) => boolean;
}
