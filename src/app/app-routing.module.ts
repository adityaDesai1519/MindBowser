import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ManagerLoginComponent} from './manager-login/manager-login.component';
import {ManagerSignupComponent} from './manager-signup/manager-signup.component';
import {ManagerHomeComponent} from './manager-home/manager-home.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component'; 
const routes: Routes = [
{path: '', redirectTo: 'manager-login', pathMatch: 'full'},
{ path: 'manager-login', component: ManagerLoginComponent },
{ path: 'signup-manager', component: ManagerSignupComponent },
{ path: 'manager-home', component: ManagerHomeComponent },
{ path: 'add-employee', component: CreateEmployeeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
