import {
  AfterViewInit,
  ApplicationRef,
  ChangeDetectorRef,
  ComponentRef,
  Directive,
  ElementRef,
  EmbeddedViewRef,
  HostListener,
  Inject,
  Input,
  OnDestroy,
  Optional,
  SkipSelf,
  TemplateRef,
  Type,
  ViewContainerRef,
} from '@angular/core';
import {
  FormGroupDirective,
  NgControl,
  ValidationErrors,
} from '@angular/forms';
import { map, merge, Subject, Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';

import { FormGroupValidatorDirective } from './form-group-validator.directive';
import { FORM_VALIDATOR_CONFIGURATION } from '../form-validator-token';
import {
  ValidationMessages,
  FormEvent,
  FormEventType,
  FormValidatorConfig,
  FormatedError,
  UIFramework,
} from '../models';
import {
  BaseValidationMessagesComponent,
  DefaultValidationMessagesComponent,
  MatValidationMessagesComponent,
} from '../components';
import { ValidatorContainerDirective } from './validator-container.directive';
import { ValidatorTargetDirective } from './validator-target.directive';
import { MatFormFieldDirective } from './mat-form-field.directive';

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
  const mapRegExp = new RegExp(interpolate(expression), 'g');

  return defaultMessage.replace(mapRegExp, (match) => {
    return String(error[match.replace(/\{\{\s*|\s*\}\}/g, '')]);
  });
}

@Directive({
  selector: '[formControl],[formControlName]',
  exportAs: 'formControlValidator',
})
export class FormControlValidatorDirective implements AfterViewInit, OnDestroy {
  @Input('skipValidate') _skipValidate = false;

  @Input() validationMessages: ValidationMessages | null = null;

  @Input() validationMessagesTemplateRef: TemplateRef<any> | null = null;

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
    return (
      this.config.validationMessagesComponent ??
      DefaultValidationMessagesComponent
    );
  }

  private _subscriptions = new Subscription();
  private _errorRef:
    | ComponentRef<BaseValidationMessagesComponent>
    | EmbeddedViewRef<any>
    | null = null;

  private _events$ = new Subject<FormEvent>();
  private _cachedValidationErrors = '';

  private get hasCacheValidationErrors(): boolean {
    return Boolean(this._cachedValidationErrors);
  }

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
    private readonly matFormFieldDirective: MatFormFieldDirective,

    @Optional()
    public readonly parentFormGroupValidatorDirective: FormGroupValidatorDirective,
  ) { }

  ngAfterViewInit(): void {
    this.listenFormEvents();
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
    this.removeValidationErrors();
  }

  @HostListener('blur', ['$event'])
  onBlur(): void {
    this._events$.next({ type: FormEventType.Blur });
  }

  private listenFormEvents(): void {
    if (!this.parent ?? !this.parent.events$) {
      return;
    }

    const sub = merge(this.parent.events$, this._events$)
      .pipe(
        skipWhile(() => this.skipValidate),
        map(() => this.formatErrors())
      )
      .subscribe((errors) => {
        this.validate(errors);
      });

    this._subscriptions.add(sub);
  }

  private shouldShowValidationError(errors: FormatedError[]): boolean {
    if (errors.length <= 0) {
      return false;
    }

    if (
      !this.config.validateOn ||
      typeof this.config.validateOn !== 'function'
    ) {
      return true;
    }

    return this.config.validateOn({
      dirty: this.control.dirty ?? false,
      touched: this.control.touched ?? false,
      submited: this.formGroupDirective.submitted,
    });
  }

  private formatErrors(): FormatedError[] {
    const errors = this.control.errors;
    if (!errors) {
      return [];
    }

    return Object.keys(errors || {}).map((key) => {
      const message = this.getErrorMessage(errors, key);

      return {
        ...errors[key],
        message,
        key,
      };
    });
  }

  private getErrorMessage(errors: ValidationErrors, key: string): string {
    if (errors[key]?.message) {
      return errors[key].message;
    }

    if (this.validationMessages?.[key]) {
      return this.validationMessages[key];
    }

    if (this.config.validationMessages?.[key]) {
      return mapReplace(this.config.validationMessages[key], errors[key]);
    }

    return this.config.unknownErrorValidationMessage ?? '[This field is invalid]';
  }

  private removeValidationErrors(): void {
    if (this._errorRef) {
      this._errorRef.destroy();
      this._errorRef = null;
    }
  }

  private cacheValidationErrors(errors: FormatedError[]): void {
    this._cachedValidationErrors = JSON.stringify(errors);
  }

  private clearCacheValidationErrors(): void {
    this._cachedValidationErrors = '';
  }

  private isValidationErrorsChanged(errors: FormatedError[]): boolean {
    return this._cachedValidationErrors !== JSON.stringify(errors);
  }

  private validate(errors: FormatedError[]): void {
    if (!this.isValidationErrorsChanged(errors)) {
      return;
    }

    if (this.config.uiFrameWork === 'auto') {
      console.log('Validation');
    }

    const uiFrameWork = this.config.uiFrameWork === 'auto' ? this.detectUIFramework() : this.config.uiFrameWork;

    switch (uiFrameWork) {
      case UIFramework.Bootstrap:
        this.bootstrapValidate(errors);
        break;

      case UIFramework.AngularMaterial:
        this.angularMaterialValidate(errors);
        break;

      default:
        this.defaultValidate(errors);
        break;
    }
  }

  private getViewContainerRef(): ViewContainerRef {
    const targetRef = this.containerRef
      ? this.containerRef.targetRef
      : this.targetRef;
    return targetRef ? targetRef.viewContainerRef : this.viewContainerRef;
  }

  private defaultValidate(errors: FormatedError[]): void {
    this.removeValidationErrors();

    if (this.shouldShowValidationError(errors)) {
      this.defaultShowValidationError(errors);
      this.cacheValidationErrors(errors);
    } else {
      this.clearCacheValidationErrors();
    }
  }

  private defaultShowValidationError(errors: FormatedError[]): void {
    this.removeValidationErrors();

    if (this.shouldShowValidationError(errors)) {
      if (!this.hasCacheValidationErrors) {
        this.bootstrapAddErrorClassToControl();
      }
      this.bootstrapShowValidationError(errors);
      this.cacheValidationErrors(errors);
    } else {
      this.clearCacheValidationErrors();
      this.bootstrapRemoveErrorClassFromControl();
    }

    const targetRef = this.containerRef ? this.containerRef.targetRef : this.targetRef;
    const viewContainerRef = targetRef ? targetRef.viewContainerRef : this.viewContainerRef;

    if (
      this.validationMessagesTemplateRef &&
      this.validationMessagesTemplateRef instanceof TemplateRef
    ) {
      this._errorRef = viewContainerRef.createEmbeddedView(
        this.validationMessagesTemplateRef,
        { $implicit: errors },
        viewContainerRef.length
      );
    } else if (this.validationMessageComponent) {
      this._errorRef = viewContainerRef.createComponent(
        this.validationMessageComponent,
        {
          index: viewContainerRef.length
        }
      );

      if (this._errorRef instanceof ComponentRef && this._errorRef.instance) {
        this._errorRef.instance.errors = errors;
        this.changeDetectorRef.detectChanges();
      }
    }
  }

  private bootstrapValidate(errors: FormatedError[]): void {
    this.removeValidationErrors();

    if (this.shouldShowValidationError(errors)) {
      if (!this.hasCacheValidationErrors) {
        this.bootstrapAddErrorClassToControl();
      }
      this.bootstrapShowValidationError(errors);
      this.cacheValidationErrors(errors);
    } else {
      this.clearCacheValidationErrors();
      this.bootstrapRemoveErrorClassFromControl();
    }
  }

  private bootstrapAddErrorClassToControl(): void {
    (this.elementRef.nativeElement as HTMLElement).classList.add('is-invalid');
  }

  private bootstrapRemoveErrorClassFromControl(): void {
    (this.elementRef.nativeElement as HTMLElement).classList.remove('is-invalid');
  }

  private bootstrapShowValidationError(errors: FormatedError[]): void {
    const targetRef = this.containerRef ? this.containerRef.targetRef : this.targetRef;
    const viewContainerRef = targetRef ? targetRef.viewContainerRef : this.viewContainerRef;

    if (
      this.validationMessagesTemplateRef &&
      this.validationMessagesTemplateRef instanceof TemplateRef
    ) {
      this._errorRef = viewContainerRef.createEmbeddedView(
        this.validationMessagesTemplateRef,
        { $implicit: errors },
        viewContainerRef.length
      );
    } else if (this.validationMessageComponent) {
      this._errorRef = viewContainerRef.createComponent(
        this.validationMessageComponent,
        {
          index: viewContainerRef.length
        }
      );

      if (this._errorRef instanceof ComponentRef && this._errorRef.instance) {
        this._errorRef.instance.errors = errors;
        this._errorRef.instance.classes = 'invalid-feedback';
        this.changeDetectorRef.detectChanges();
      }
    }

    if (!targetRef) {
      let rootNode: HTMLElement | null = null;
      if (this._errorRef instanceof ComponentRef) {
        rootNode = (this._errorRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
      } else if (this._errorRef instanceof EmbeddedViewRef) {
        rootNode = this._errorRef.rootNodes[0] as HTMLElement;
      }

      const containerTarget = (viewContainerRef.element.nativeElement as HTMLElement).parentElement;
      if (rootNode && containerTarget) {
        containerTarget.appendChild(rootNode);
      }
    }
  }

  private angularMaterialValidate(errors: FormatedError[]): void {
    this.removeValidationErrors();

    if (this.shouldShowValidationError(errors)) {
      this.angularMaterialShowValidationError(errors);
      this.cacheValidationErrors(errors);
    } else {
      this.clearCacheValidationErrors();
    }
  }

  private angularMaterialShowValidationError(errors: FormatedError[]): void {
    const viewContainerRef = this.viewContainerRef;

    if (
      this.validationMessagesTemplateRef &&
      this.validationMessagesTemplateRef instanceof TemplateRef
    ) {
      this._errorRef = viewContainerRef.createEmbeddedView(
        this.validationMessagesTemplateRef,
        { $implicit: errors },
        viewContainerRef.length
      );
    } else {
      this._errorRef = viewContainerRef.createComponent(
        MatValidationMessagesComponent,
        {
          index: viewContainerRef.length
        }
      );

      if (this._errorRef instanceof ComponentRef && this._errorRef.instance) {
        this._errorRef.instance.errors = errors;
        this._errorRef.instance.classes = 'mat-mdc-form-field-error-wrapper';
        this.changeDetectorRef.detectChanges();
      }
    }

    let rootNode: HTMLElement | null = null;
    if (this._errorRef instanceof ComponentRef) {
      rootNode = (this._errorRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    } else if (this._errorRef instanceof EmbeddedViewRef) {
      rootNode = this._errorRef.rootNodes[0] as HTMLElement;
    }

    const selector = '.mat-mdc-form-field-subscript-wrapper';

    const containerTarget = (this.matFormFieldDirective.elementRef.nativeElement as HTMLElement).querySelector(selector);
    if (rootNode && containerTarget) {
      containerTarget.appendChild(rootNode);
    }
  }

  private detectUIFramework(): UIFramework {
    const classList = (this.elementRef.nativeElement as HTMLElement).classList;
    if (classList.contains('form-control') || classList.contains('form-select') || classList.contains('form-check-input')) {
      return UIFramework.Bootstrap
    }

    if (this.matFormFieldDirective && (classList.contains('mat-mdc-input-element') || classList.contains('mat-mdc-select'))) {
      return UIFramework.AngularMaterial
    }

    return UIFramework.None;
  }
}
