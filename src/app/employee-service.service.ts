import { Injectable } from '@angular/core';
import { Http, RequestOptions , Headers ,URLSearchParams } from '@angular/http';  

import { Observable } from 'rxjs';
import {Manager} from './manager';
import {Employee} from './employee';
@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {
	
	private base_url="http://localhost:8080/api/";
  constructor(private http: Http) { }
 login(manager):Observable<any>{
	 let url = this.base_url+"manager_Login_POST";
	 console.log(manager.mgr_email);
	 return this.http.post(url,manager);
 }
 signup(manager):Observable<any>{
	 let url = this.base_url+"manager_SignUp";
	 return this.http.post(url,manager);
 }
 getEmployeeList(manager_email):Observable<any>{
	 let url = this.base_url+"fetchall_Employee";
	 let params: URLSearchParams = new URLSearchParams();
	params.set('emp_mgrId', manager_email);
	let requestOptions = new RequestOptions();
	requestOptions.search = params;
	 console.log(manager_email);
	 return this.http.get(url,requestOptions);
 }
 create_employee(employee):Observable<any>{
	 let url = this.base_url+"Create_employee";
	 return this.http.post(url,employee);
 }
 update_employee(employee):Observable<any>{
	 let url = this.base_url+"Update_employee";
	 console.log(employee.emp_id);
	 return this.http.post(url,employee);
 }
 delete_employee(employee_id):Observable<any>{
	let url=this.base_url+"Delete_employee";
	let params: URLSearchParams = new URLSearchParams();
	params.set('emp_Id', employee_id);
	let requestOptions = new RequestOptions();
	requestOptions.search = params;
	console.log("Delete ACtion"+employee_id);
	return this.http.get(url,requestOptions);
 }
}
