import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[validatorMessagesTarget]',
  exportAs: 'validatorMessagesTarget',
})
export class ValidatorTargetDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
