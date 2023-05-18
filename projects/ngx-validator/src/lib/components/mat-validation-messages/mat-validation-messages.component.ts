import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation } from '@angular/core';
import { BaseValidationMessagesComponent } from '../base-validation-messages';
import { matFormFieldAnimations } from '@angular/material/form-field';

@Component({
  selector: 'validation-messages',
  template: `
    <div [@transitionMessages]="'enter'" class="mat-mdc-form-field-error mat-mdc-form-field-bottom-align" *ngFor="let error of errors; trackBy: trackByFn">
      {{ error.message }}
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  animations: [matFormFieldAnimations.transitionMessages],
})
export class MatValidationMessagesComponent extends BaseValidationMessagesComponent {
  @HostBinding('class') override classes: string = '';
}
