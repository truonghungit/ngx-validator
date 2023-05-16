import { TrackByFunction } from '@angular/core';
import { FormatedError } from '../models';

export abstract class BaseValidationMessagesComponent {
  errors: FormatedError[] = [];
  classes = '';

  trackByFn: TrackByFunction<FormatedError> = (_, item) => item.key;
}
