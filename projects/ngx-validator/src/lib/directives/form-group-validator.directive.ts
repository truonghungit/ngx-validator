import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  Inject,
  Input,
  OnDestroy,
  Optional,
  Self,
  SkipSelf,
} from '@angular/core';
import { FormGroup, FormGroupDirective, FormGroupName } from '@angular/forms';
import { merge, NEVER, Observable, Subject, Subscription } from 'rxjs';
import { FormEvent, FormEventType, FormValidatorConfig } from '../form-validator.model';
import { FORM_VALIDATOR_CONFIGURATION } from '../form-validator-token';

@Directive({
  selector: '[formGroup],[formGroupName]',
  exportAs: 'formGroupValidator',
})
export class FormGroupValidatorDirective implements AfterViewInit, OnDestroy {
  @Input('skipValidate') _skipValidate = false;

  get parent(): Partial<FormGroupValidatorDirective> {
    return this.parentFormGroupValidatorDirective;
  }

  get skipValidate(): boolean {
    return (
      this.config.skipValidate ??
      this._skipValidate ??
      Boolean(this.parent?.skipValidate)
    );
  }

  get formGroup(): FormGroup {
    return this.formGroupDirective
      ? this.formGroupDirective.form
      : this.formGroupName.control;
  }

  get events$(): Observable<FormEvent> {
    return merge(this._events$ ?? NEVER, this.parent?.events$ ?? NEVER);
  }

  private _events$ = new Subject<FormEvent>();
  private _subscriptions = new Subscription();

  constructor(
    private readonly elementRef: ElementRef,

    @Self()
    @Optional()
    private readonly formGroupName: FormGroupName,

    @Self()
    @Optional()
    private readonly formGroupDirective: FormGroupDirective,

    @Inject(FORM_VALIDATOR_CONFIGURATION)
    private readonly config: FormValidatorConfig,

    @SkipSelf()
    @Optional()
    private readonly parentFormGroupValidatorDirective: FormGroupValidatorDirective
  ) {}

  ngAfterViewInit(): void {
    this.listenFormEvents();
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  @HostListener('submit', ['$event'])
  onSubmit(event: Event): void {
    if (!(this.elementRef.nativeElement instanceof HTMLFormElement)) {
      return;
    }

    if (this.formGroup.invalid) {
      event.preventDefault();
    }
    this._events$.next({
      type: FormEventType.FormSubmit,
      value: this.formGroup,
    });
  }

  private listenFormEvents(): void {
    this._events$.next({
      type: FormEventType.FormInitial,
      value: this.formGroup,
    });

    this._subscriptions.add(
      this.formGroup.statusChanges.subscribe(() => {
        this._events$.next({
          type: FormEventType.StatusChange,
          value: this.formGroup,
        });
      })
    );

    this._subscriptions.add(
      this.formGroup.valueChanges.subscribe(() => {
        this._events$.next({
          type: FormEventType.ValueChange,
          value: this.formGroup,
        });
      })
    );
  }
}
