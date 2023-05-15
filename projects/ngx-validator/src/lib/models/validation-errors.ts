import { ValidationErrors } from '@angular/forms'

export interface NgxValidationErrors extends ValidationErrors {
  message: string;
}
