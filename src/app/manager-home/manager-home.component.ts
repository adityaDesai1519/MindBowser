import { Component, OnInit ,ViewChild} from '@angular/core';
import { EmployeeServiceService } from '../employee-service.service';  
import {Employee} from '../employee';

import { FormGroup, Validators, FormControl } from '@angular/forms'; 
import {Manager} from '../manager';
import { Router } from '@angular/router';  
import { Subject } from 'rxjs';
@Component({
  selector: 'app-manager-home',
  templateUrl: './manager-home.component.html',
  styleUrls: ['./manager-home.component.css']
})
export class ManagerHomeComponent implements OnInit {
private manager= new Manager();
  constructor(private employeeServiceService:EmployeeServiceService, private router : Router) { }
  employeeArray$: any[] = [];  
  updateEmployeeArray$: any[] = [];  
  dtOptions: DataTables.Settings = {};  
  dtTrigger: Subject<any>= new Subject();  
  public employee =new Employee();  
  @ViewChild('updateEmployeeModal') myModal;
  employeeUpdateForm = new FormGroup({  
	id : new FormControl('' , Validators.required),
    fname : new FormControl('' , Validators.required),
	lname : new FormControl('' , Validators.required),
	address : new FormControl('' , Validators.required),
	dob : new FormControl('' , Validators.required),
	mobile : new FormControl('' , Validators.required),
	city : new FormControl('' , Validators.required)
  }); 
   ngOnInit(): void {
	 this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    }; 
    this.employeeServiceService.getEmployeeList(localStorage.getItem("manager_email")).subscribe(data =>{  
    this.employeeArray$ =JSON.parse(data._body);  
	console.log(this.employeeArray$);
    this.dtTrigger.next();  
    });  
  }
 deleteEmployee(employee){
	 if(window.confirm("Do you want to delete "+employee.emp_fname)){
		 console.log("Delete ACtion"+employee.emp_id);
		 this.employee.emp_id = employee.emp_id;
		 this.employeeArray$=[];
		 this.employeeServiceService.delete_employee(employee.emp_id).subscribe(data=>{
			 if(data._body=="success"){
				 this.employeeServiceService.getEmployeeList(localStorage.getItem("manager_email")).subscribe(data =>{  
					this.employeeArray$ =JSON.parse(data._body);  
					console.log(this.employeeArray$);
					this.dtTrigger.next();  
					});  
			 }
			 else{
				 window.alert("Deletion failed. please try again");
			 }
		 });
	 }
 }
updateEmployee(UpdateEmployee){
	
	this.employee.emp_fname = this.Fname.value;
	this.employee.emp_id = this.Id.value;
	console.log("Updateing "+this.employee.emp_fname+","+this.employee.emp_id);
	this.employee.emp_lname = this.Lname.value;
	this.employee.emp_address = this.Address.value;
	this.employee.emp_dob = this.Dob.value;
	this.employee.emp_mobile = this.Mobile.value;
	this.employee.emp_city = this.City.value;
	this.employee.emp_mgrId = localStorage.getItem("manager_email").toString();
	this.employeeServiceService.update_employee(this.employee).subscribe(data=>{
		console.log(data._body);
		if(data._body=="success"){
			  this.myModal.nativeElement.style.display = 'none';
			  window.alert("Employee updated!!");
			  this.employeeServiceService.getEmployeeList(localStorage.getItem("manager_email")).subscribe(data =>{  
					this.employeeArray$ =JSON.parse(data._body);
					this.dtTrigger.next();  
					}); 
					$('.modal-backdrop').remove();
		}
		else{
			this.myModal.nativeElement.className = 'modal hide';
			window.alert("Failed!! Try again."); 
		}
	});
	
}
openModel() {
  
}
closeModel() {
   this.myModal.nativeElement.className = 'modal hide';
}
showEmployeeModal(employee){
	this.updateEmployeeArray$=[];
		console.log(employee.emp_id);
		this.updateEmployeeArray$.push(employee);
		this.employeeUpdateForm.patchValue({id:employee.emp_id,
		fname:employee.emp_fname,
		lname:employee.emp_lname,
		city:employee.emp_city,
		dob:employee.emp_dob,
		address:employee.emp_address,
		mobile:employee.emp_mobile});
		this.myModal.nativeElement.className = 'modal fade show';
}
get Id(){
	return this.employeeUpdateForm.get('id');
}
get Fname(){  
      return this.employeeUpdateForm.get('fname');  
  }
get Lname(){  
      return this.employeeUpdateForm.get('lname');  
  } 
      
get Address(){  
      return this.employeeUpdateForm.get('address');  
  }
get Mobile(){  
      return this.employeeUpdateForm.get('mobile');  
  } 
get City(){  
      return this.employeeUpdateForm.get('city');  
  } 
get Dob(){  
      return this.employeeUpdateForm.get('dob');  
  }   
}
