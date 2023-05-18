import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-angular-material',
  templateUrl: './angular-material.component.html',
  styleUrls: ['./angular-material.component.scss']
})
export class AngularMaterialComponent {
  simpleForm = this.formBuilder.group({
    school: ['', [Validators.required]],
    degree: ['', [Validators.required]],
    areaOfStudy: ['', [Validators.required]],
    description: ['', [Validators.required]],
  });

  constructor(private formBuilder: FormBuilder) { }

  onSubmit(): void {
  }
}
