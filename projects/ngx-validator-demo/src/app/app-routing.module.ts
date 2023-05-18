import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BootstrapComponent } from './bootstrap/bootstrap.component';
import { AngularMaterialComponent } from './angular-material/angular-material.component';

const routes: Routes = [
  {
    path: '',
    component: BootstrapComponent
  },
  {
    path: 'material',
    component: AngularMaterialComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
