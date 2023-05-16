import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

const matchPassword = (password: string, confirmPassword: string) => {
  return (formGroup: FormGroup) => {
    const passwordControl = formGroup.controls[password];
    const confirmPasswordControl = formGroup.controls[confirmPassword];

    if (!passwordControl || !confirmPasswordControl) {
      return;
    }

    if (
      confirmPasswordControl.errors &&
      !confirmPasswordControl.errors['passwordMismatch']
    ) {
      return;
    }

    if (passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({
        passwordMismatch: { message: 'Confirm password not match' },
      });
    } else {
      confirmPasswordControl.setErrors(null);
    }
  };
};

@Component({
  selector: 'app-bootstrap',
  templateUrl: './bootstrap.component.html',
  styleUrls: ['./bootstrap.component.scss']
})
export class BootstrapComponent {
  simpleForm = this.formBuilder.group({
    school: ['', [Validators.required]],
    degree: ['', [Validators.required]],
    areaOfStudy: ['', [Validators.required]],
    description: [''],
  });

  nestedForm = this.formBuilder.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    address: this.formBuilder.group({
      address: ['', [Validators.required]],
      address2: [''],
      city: ['', [Validators.required]],
      state: [''],
      zip: [''],
    }),
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]],
    agreeTermsCondition: ['', [Validators.requiredTrue]],
  }, {
    validators: [matchPassword('password', 'confirmPassword')]
  });

  constructor(private formBuilder: FormBuilder) { }

  onSubmit(): void {
  }
}
