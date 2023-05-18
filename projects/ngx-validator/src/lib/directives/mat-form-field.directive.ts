import { Directive, ElementRef, ViewContainerRef } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';

@Directive({
  selector: 'mat-error',
  exportAs: 'matError',
})
export class MatErrorDirective {
  constructor(public viewContainerRef: ViewContainerRef) {
    console.log('MatErrorDirective');
  }
}

@Directive({
  selector: 'mat-form-field',
  exportAs: 'matFormField',
})
export class MatFormFieldDirective {
  constructor(public matFormField: MatFormField, public elementRef: ElementRef) {
    console.log('MatFormFieldDirective');
  }

  ngAfterContentInit(): void {
    console.log('matFormField ');
    this.matFormField._errorChildren.changes.subscribe(e => {

      console.log('hihi-----------', e);
    });

  }

}
