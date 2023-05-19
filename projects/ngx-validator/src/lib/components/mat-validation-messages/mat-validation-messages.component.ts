import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation } from '@angular/core';
import { animate, state, style, trigger, transition } from '@angular/animations';

import { BaseValidationMessagesComponent } from '../base-validation-messages';

const transitionMessages = trigger('transitionMessages', [
  state('enter', style({ opacity: 1, transform: 'translateY(0%)' })),
  transition('void => enter', [
    style({ opacity: 0, transform: 'translateY(-5px)' }),
    animate('300ms cubic-bezier(0.55, 0, 0.55, 0.2)'),
  ]),
]);

@Component({
  selector: 'validation-messages',
  template: `
    <div [@transitionMessages]="'enter'" class="mat-mdc-form-field-error mat-mdc-form-field-bottom-align" *ngFor="let error of errors; trackBy: trackByFn">
      {{ error.message }}
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  animations: [transitionMessages],
})
export class MatValidationMessagesComponent extends BaseValidationMessagesComponent {
  @HostBinding('class') override classes: string = '';
}
