import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[validatorTarget]',
  exportAs: 'validatorTarget',
})
export class ValidatorTargetDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
