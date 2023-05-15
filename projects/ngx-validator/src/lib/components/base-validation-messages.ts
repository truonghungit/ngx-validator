import { TrackByFunction } from '@angular/core';
import { FormatedError } from '../models';

export abstract class BaseValidationMessagesComponent {
  errors: Array<FormatedError> = [];

  trackByFn: TrackByFunction<FormatedError> = (_, item) => item.key;
}
