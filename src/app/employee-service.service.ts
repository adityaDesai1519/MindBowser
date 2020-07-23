import { Injectable } from '@angular/core';
import { Http, RequestOptions , Headers ,URLSearchParams } from '@angular/http';  
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError  } from 'rxjs';
import {Manager} from './manager';
import {Employee} from './employee';
@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {
	
	private base_url="http://localhost:8080/";
  constructor(private http: Http) { }
 login(mgr_email,mgr_password):Observable<any>{
	let url = this.base_url+"manager/fetchManager";
	let params: URLSearchParams = new URLSearchParams();
	params.set('mgr_email', mgr_email);
	params.set('mgr_password',mgr_password);
	let requestOptions = new RequestOptions();
	requestOptions.search = params;
	return this.http.get(url,requestOptions);
 }
  
 handleError(error) {
   let errorMessage = '';
   if (error.error instanceof ErrorEvent) {
     // client-side error
     errorMessage = `Error: ${error.error.message}`;

   } else {
     // server-side error
     errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;

   }
   window.alert(errorMessage);
   return throwError(errorMessage);
 }
 signup(manager):Observable<any>{
	 let url = this.base_url+"manager";
	 return this.http.post(url,manager);
 }
 getEmployeeList(manager_email):Observable<any>{
	 let url = this.base_url+"employee/fetchAllByManagerEmail";
	 let params: URLSearchParams = new URLSearchParams();
	params.set('emp_mgrid', manager_email);
	let requestOptions = new RequestOptions();
	requestOptions.search = params;
	 console.log(manager_email);
	 return this.http.get(url,requestOptions);
 }
 create_employee(employee):Observable<any>{
	 let url = this.base_url+"employee";
	 return this.http.post(url,employee);
 }
 update_employee(employee):Observable<any>{
	 let url = this.base_url+"employee/"+employee.emp_id;
	 console.log(employee.emp_id);
	 return this.http.put(url,employee);
 }
 delete_employee(employee_id):Observable<any>{
	let url=this.base_url+"employee/"+employee_id;
	let params: URLSearchParams = new URLSearchParams();
	params.set('emp_id', employee_id);
	let requestOptions = new RequestOptions();
	requestOptions.search = params;
	console.log("Delete ACtion"+employee_id);
	return this.http.delete(url,requestOptions);
 }
}
