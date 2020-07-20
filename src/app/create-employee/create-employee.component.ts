import { Component, OnInit } from '@angular/core';
import { EmployeeServiceService } from '../employee-service.service';  

import { FormGroup, Validators, FormControl } from '@angular/forms'; 
import {Employee} from '../employee';
import { Router } from '@angular/router';  

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
private employee = new Employee();
  constructor(private employeeServiceService:EmployeeServiceService, private router : Router) { }
 form = new FormGroup({  
    fname : new FormControl('' , Validators.required),
	lname : new FormControl('' , Validators.required),
	address : new FormControl('' , Validators.required),
	dob : new FormControl('' , Validators.required),
	mobile : new FormControl('' , Validators.required),
	city : new FormControl('' , Validators.required),
	dept : new FormControl('' , Validators.required)
  }); 

  ngOnInit(): void {
  }
onSubmit(CreateEmployeeInformation){
	this.employee.emp_fname = this.Fname.value;
	this.employee.emp_lname = this.Lname.value;
	this.employee.emp_address = this.Address.value;
	this.employee.emp_dob = this.Dob.value;
	this.employee.emp_mobile = this.Mobile.value;
	this.employee.emp_city = this.City.value;
	this.employee.emp_mgrId = localStorage.getItem("manager_email").toString();
	this.employeeServiceService.create_employee(this.employee).subscribe(data=>{
		if(data._body=="success"){
			  this.router.navigate(['/manager-home']);  
			  window.alert("Employee added!!");
		}
		else{
			window.alert("Failed!! Try again."); 
		}
	});
	
}
get Fname(){  
      return this.form.get('fname');  
  } 
get Lname(){  
      return this.form.get('lname');  
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
get Dob(){  
      return this.form.get('dob');  
  }   
}
