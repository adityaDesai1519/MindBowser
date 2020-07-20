import { Component, OnInit } from '@angular/core';
import { EmployeeServiceService } from '../employee-service.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';   
import {Manager} from '../manager'; 
import { Router } from '@angular/router'; 
@Component({
  selector: 'app-manager-login',
  templateUrl: './manager-login.component.html',
  styleUrls: ['./manager-login.component.css']
})
export class ManagerLoginComponent implements OnInit {
 private manager= new Manager();
  constructor(private employeeServiceService:EmployeeServiceService, private router : Router) { }
	
  ngOnInit(): void {
  }
  form = new FormGroup({  
    email : new FormControl('' , Validators.required),  
    password : new FormControl('' , Validators.required)  
  });  
manager_login(ManagerLogin){
	this.manager.mgr_email = this.Email.value;
	this.manager.mgr_password = this.Password.value;
	console.log(this.manager.mgr_email);
	console.log(this.manager.mgr_password);
	if(this.manager.mgr_email=="" || (this.manager.mgr_password)==""){
		window.alert("Please fill all the fields");
	}else{
	this.employeeServiceService.login(this.manager).subscribe(data=>{
		console.log(data._body);
		if(data._body=="success"){
			this.router.navigate(['/manager-home']);
			localStorage.setItem("manager_email",this.manager.mgr_email.toString());
		}else{
			window.alert("Incorrect login details");
		}
	});
	}
}
 get Email(){  
      return this.form.get('email');  
  }  
  
  get Password(){  
      return this.form.get('password');  
  }  
}
