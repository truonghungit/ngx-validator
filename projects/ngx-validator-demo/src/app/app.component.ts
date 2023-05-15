import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { NgxValidators } from 'projects/ngx-validator/src/public-api';

const myValidator = (control: AbstractControl): ValidationErrors | null => {
  if (control.value) {
    return control.value === 'admin' ? {
      notAllowAdmin: {
        message: 'khong dc nha'
      }
    } : null;
  }
  return null;
}

const matchPassword = (password: string, confirmPassword: string) => {
  return (formGroup: FormGroup) => {
    const passwordControl = formGroup.controls[password];
    const confirmPasswordControl = formGroup.controls[confirmPassword];

    if (!passwordControl || !confirmPasswordControl) {
      return;
    }

    if (confirmPasswordControl.errors && !confirmPasswordControl.errors['passwordMismatch']) {
      return;
    }

    if (passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ passwordMismatch: {message: 'not match'} });
    } else {
      confirmPasswordControl.setErrors(null);
    }
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  registerForm = this.formBuilder.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    address: this.formBuilder.group({
      street: ['', [Validators.required]],
      city: ['', [Validators.required]],
    }),
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]],
  });

  constructor(private formBuilder: FormBuilder) { }

  onSubmit(): void {
    console.log(this.loginForm)
  }

}
