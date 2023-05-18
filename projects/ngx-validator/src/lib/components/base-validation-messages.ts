import { TrackByFunction } from '@angular/core';
import { FormatedError } from '../form-validator.model';

export abstract class BaseValidationMessagesComponent {
  errors: FormatedError[] = [];
  classes = '';

  trackByFn: TrackByFunction<FormatedError> = (_, item) => item.key;
}
