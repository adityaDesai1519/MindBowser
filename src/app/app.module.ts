import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule  }   from '@angular/forms';
import { HttpModule } from '@angular/http';  
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ManagerLoginComponent } from './manager-login/manager-login.component';
import { ManagerSignupComponent } from './manager-signup/manager-signup.component';
import { ManagerHomeComponent } from './manager-home/manager-home.component';
import {DataTablesModule} from 'angular-datatables';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';  
@NgModule({
  declarations: [
    AppComponent,
    ManagerLoginComponent,
    ManagerSignupComponent,
    ManagerHomeComponent,
    CreateEmployeeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
	FormsModule,
	ReactiveFormsModule,
	HttpModule,
	DataTablesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
