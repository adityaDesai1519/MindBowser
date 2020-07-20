import { Component, OnInit } from '@angular/core';
import { EmployeeServiceService } from '../employee-service.service';  

import { FormGroup, Validators, FormControl } from '@angular/forms'; 
import {Manager} from '../manager';
import { Router } from '@angular/router';  
@Component({
  selector: 'app-manager-signup',
  templateUrl: './manager-signup.component.html',
  styleUrls: ['./manager-signup.component.css']
})
export class ManagerSignupComponent implements OnInit {
	private manager= new Manager();
  constructor(private employeeServiceService:EmployeeServiceService, private router : Router) { }
   form = new FormGroup({  
    email : new FormControl('' , Validators.required),  
    password : new FormControl('' , Validators.required),
	repassword : new FormControl('' , Validators.required),
	fname : new FormControl('' , Validators.required),
	lname : new FormControl('' , Validators.required),
	address : new FormControl('' , Validators.required),
	mobile : new FormControl('' , Validators.required),
	city : new FormControl('' , Validators.required),
	dept : new FormControl('' , Validators.required)
  }); 

  ngOnInit(): void {
  }
onSubmit(SignUpInformation){
	this.manager.mgr_email = this.Email.value;
	this.manager.mgr_password = this.Password.value;
	this.manager.mgr_repassword = this.Repassword.value;
	this.manager.mgr_fname = this.Fname.value;
	this.manager.mgr_lname = this.Lname.value;
	this.manager.mgr_address = this.Address.value;
	this.manager.mgr_mobile = this.Mobile.value;
	this.manager.mgr_city = this.City.value;
	this.manager.mgr_dept = this.Dept.value;
	console.log(this.manager.mgr_email);
	console.log(this.manager.mgr_fname);
	if(this.manager.mgr_password == this.manager.mgr_repassword){
		this.employeeServiceService.signup(this.manager).subscribe(data=>{
			if(data._body=="success"){
				  this.router.navigate(['/manager-login']);  
			}
			else{
				window.alert("Failed!! Try again."); 
			}
		});
	}
	else{
		window.alert("Password and confirm password not match."); 
	}
}
get Email(){  
      return this.form.get('email');  
  }
get Password(){  
      return this.form.get('password');  
  } 
get Fname(){  
      return this.form.get('fname');  
  } 
get Lname(){  
      return this.form.get('lname');  
  } 
get Repassword(){  
      return this.form.get('repassword');  
  } 
get Address(){  
      return this.form.get('address');  
  }
get Mobile(){  
      return this.form.get('mobile');  
  } 
get City(){  
      return this.form.get('city');  
  } 
get Dept(){  
      return this.form.get('dept');  
  }   
}
