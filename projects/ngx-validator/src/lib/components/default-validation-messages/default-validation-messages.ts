import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { BaseValidationMessagesComponent } from '../base-validation-messages';

@Component({
  selector: 'validation-messages',
  template: `
    <div *ngFor="let error of errors; trackBy: trackByFn">
      {{ error.message }}
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class DefaultValidationMessagesComponent extends BaseValidationMessagesComponent {
}
