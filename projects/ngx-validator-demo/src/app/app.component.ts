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
        passwordMismatch: { message: 'not match' },
      });
    } else {
      confirmPasswordControl.setErrors(null);
    }
  };
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  registerForm = this.formBuilder.group(
    {
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      address: this.formBuilder.group({
        street: ['', [Validators.required]],
        city: ['', [Validators.required]],
      }),
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    },
    {
      validators: [matchPassword],
    }
  );

  constructor(private formBuilder: FormBuilder) {}

  onSubmit(): void {
    console.log(this.loginForm);
  }
}
