import { TrackByFunction } from '@angular/core';
import { FormatedError } from '../models';

export abstract class BaseValidationMessagesComponent {
  errors: FormatedError[] = [];

  trackByFn: TrackByFunction<FormatedError> = (_, item) => item.key;
}
