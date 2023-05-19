import { Directive, ElementRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: 'mat-error',
  exportAs: 'matError',
})
export class MatErrorDirective {
  constructor(public viewContainerRef: ViewContainerRef) {
  }
}

@Directive({
  selector: 'mat-form-field',
  exportAs: 'matFormField',
})
export class MatFormFieldDirective {
  constructor(public elementRef: ElementRef) {
  }
}
