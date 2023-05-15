import { ContentChild, Directive } from '@angular/core';
import { ValidatorTargetDirective } from './validator-target.directive';

@Directive({
  selector: '[validatorContainer]',
  exportAs: 'validatorContainer',
})
export class ValidatorContainerDirective {
  @ContentChild(ValidatorTargetDirective) targetRef: ValidatorTargetDirective | null = null;
}
