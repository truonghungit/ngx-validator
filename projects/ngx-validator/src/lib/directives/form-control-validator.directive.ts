import { AfterViewInit, ApplicationRef, ChangeDetectorRef, ComponentRef, Directive, ElementRef, EmbeddedViewRef, HostListener, Inject, Injector, Input, OnDestroy, Optional, Renderer2, SkipSelf, TemplateRef, Type, ViewContainerRef } from '@angular/core';
import { FormGroupDirective, NgControl, ValidationErrors } from '@angular/forms';
import { map, merge, Subject, Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';

import { FormGroupValidatorDirective } from './form-group-validator.directive';
import { FORM_VALIDATOR_CONFIGURATION } from '../form-validator-token';
import { ErrorMessage, FormEvent, FormEventType, FormValidatorConfig, FormatedError } from '../models';
import { BaseValidationMessagesComponent, DefaultValidationMessagesComponent } from '../components';
import { ValidatorContainerDirective } from './validator-container.directive';
import { ValidatorTargetDirective } from './validator-target.directive';

export function interpolate(text: string): string {
  return '{{\\s*(' + text + ')\\s*}}';
}

export function mapReplace(
  defaultMessage: string,
  error: ValidationErrors
): string {
  if (typeof defaultMessage !== 'string') {
    return '';
  }

  if (typeof error !== 'object') {
    return defaultMessage;
  }

  const expression = Object.keys(error).join('|');
  const mapRegExp = new RegExp(interpolate(expression), 'g',);

  return defaultMessage.replace(mapRegExp, match => {
    return String(error[match.replace(/\{\{\s*|\s*\}\}/g, '')]);
  });
}

@Directive({
  selector: '[formControl],[formControlName]',
  exportAs: 'formControlValidator',
})
export class FormControlValidatorDirective implements AfterViewInit, OnDestroy {

  @Input('skipValidate')
  _skipValidate = false;

  @Input()
  errorMessage: ErrorMessage | null = null;

  @Input()
  validationMessageTemplateRef: TemplateRef<any> | null = null;

  get parent(): Partial<FormGroupValidatorDirective> {
    return this.parentFormGroupValidatorDirective;
  }

  get skipValidate(): boolean {
    return (
      Boolean(this.config.skipValidate) ||
      Boolean(this._skipValidate) ||
      Boolean(this.parent.skipValidate)
    );
  }

  get validationMessageComponent(): Type<BaseValidationMessagesComponent> {
    return this.config.validationMessagesComponent || DefaultValidationMessagesComponent;
  }

  private _subscriptions = new Subscription();
  private _errorRef: ComponentRef<BaseValidationMessagesComponent> | EmbeddedViewRef<any> | null = null;
  private _events$ = new Subject<FormEvent>()

  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly applicationRef: ApplicationRef,
    private readonly control: NgControl,
    private readonly elementRef: ElementRef,
    private readonly viewContainerRef: ViewContainerRef,

    @Optional()
    private containerRef: ValidatorContainerDirective,

    @Optional()
    @SkipSelf()
    public targetRef: ValidatorTargetDirective,

    @Optional()
    private readonly formGroupDirective: FormGroupDirective,

    @Inject(FORM_VALIDATOR_CONFIGURATION)
    private readonly config: FormValidatorConfig,

    @Optional()
    public readonly parentFormGroupValidatorDirective: FormGroupValidatorDirective,
  ) {
  }

  ngAfterViewInit() {
    this.listenFormEvents();
  }


  ngOnDestroy() {
    this._subscriptions.unsubscribe();
  }

  @HostListener('blur', ['$event'])
  onBlur(): void {
    this._events$.next({ type: FormEventType.Blur });
  }

  private listenFormEvents(): void {
    if (!this.parent || !this.parent.events$) {
      return;
    }

    let _cachedErrors = '';

    const sub = merge(this.parent.events$, this._events$).pipe(
      skipWhile(() => this.skipValidate),
      map(() => this.formatErrors()),
    ).subscribe((errors) => {
      if (_cachedErrors === JSON.stringify(errors)) {
        return;
      }

      this.removeValidationErrors();
      if (this.shouldShowValidate(errors)) {
        _cachedErrors = JSON.stringify(errors);
        this.showValidationErrors(errors);
      } else {
        _cachedErrors = '';
      }
    });

    this._subscriptions.add(sub);
  }

  private shouldShowValidate(errors: Array<FormatedError>): boolean {
    if (errors.length <= 0) {
      return false;
    }

    if (!this.config.validateOn || typeof this.config.validateOn !== 'function') {
      return true;
    }

    return this.config.validateOn({
      dirty: this.control.dirty || false,
      touched: this.control.touched || false,
      submited: this.formGroupDirective.submitted,
    });
  }

  private formatErrors(): Array<FormatedError> {
    const errors = this.control.errors;
    if (!errors) {
      return [];
    }

    return Object.keys(errors || {}).map(key => {
      const message = this.getErrorMessage(errors, key);

      return {
        ...errors[key],
        message,
        key,
      };
    })
  }

  private getErrorMessage(errors: ValidationErrors, key: string): string {
    if (errors[key] && errors[key]['message']) {
      return errors[key]['message'];
    }

    if (this.errorMessage && this.errorMessage[key]) {
      return this.errorMessage[key];
    }

    if (this.config.defaultErrorMessage && this.config.defaultErrorMessage[key]) {
      return mapReplace(this.config.defaultErrorMessage[key], errors[key])
    }

    return this.config.unknownErrorMessage || '[This field is invalid]';
  }

  private removeValidationErrors(): void {
    if (this._errorRef) {
      this._errorRef.destroy();
      this._errorRef = null;
    }
  }

  private showValidationErrors(errors: Array<FormatedError>) {
    const viewContainerRef = this.getViewContainerRef();

    if (this.validationMessageTemplateRef && this.validationMessageTemplateRef instanceof TemplateRef) {
      this._errorRef = viewContainerRef.createEmbeddedView(this.validationMessageTemplateRef, { $implicit: errors }, viewContainerRef.length);
    } else if (this.validationMessageComponent) {
      this._errorRef = viewContainerRef.createComponent(this.validationMessageComponent, { index: viewContainerRef.length });

      if (this._errorRef instanceof ComponentRef && this._errorRef.instance) {
        this._errorRef.instance.errors = errors;
        this.changeDetectorRef.detectChanges();
      }
    }
  }

  private getViewContainerRef(): ViewContainerRef {
    const targetRef = this.containerRef ? this.containerRef.targetRef : this.targetRef;
    return targetRef ? targetRef.viewContainerRef : this.viewContainerRef;
  }
}
