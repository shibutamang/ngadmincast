// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// RxJS
import { Observable } from 'rxjs';
// CRUD
import { HttpUtilsService, QueryParamsModel, QueryResultsModel } from '../../_base';
// Models
import { EmployeeModel } from '../_models/employee.model';

const API_EMPLOYEES_URL = 'api/employees';

@Injectable()
export class EmployeesService {
	constructor(private http: HttpClient, private httpUtils: HttpUtilsService) { }

	// CREATE =>  POST: add a new customer to the server
	createEmployee(customer: EmployeeModel): Observable<EmployeeModel> {
		// Note: Add headers if needed (tokens/bearer)
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		return this.http.post<EmployeeModel>(API_EMPLOYEES_URL, customer, { headers: httpHeaders});
	}

	// READ
	getAllEmployees(): Observable<EmployeeModel[]> {
		return this.http.get<EmployeeModel[]>(API_EMPLOYEES_URL);
	}

	getEmployeeById(customerId: number): Observable<EmployeeModel> {
		return this.http.get<EmployeeModel>(API_EMPLOYEES_URL + `/${customerId}`);
	}

	// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
	// items => filtered/sorted result
	// Server should return filtered/sorted result
	findEmployees(queryParams: QueryParamsModel): Observable<any> {
		// Note: Add headers if needed (tokens/bearer)
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		const httpParams = this.httpUtils.getFindHTTPParams(queryParams);

		const url = API_EMPLOYEES_URL;
		return this.http.get<any>(url, {
			headers: httpHeaders,
			params:  httpParams
		});
	}

	// UPDATE => PUT: update the customer on the server
	updateEmployee(customer: EmployeeModel): Observable<any> {
		const httpHeader = this.httpUtils.getHTTPHeaders();
		return this.http.put(API_EMPLOYEES_URL, customer, { headers: httpHeader });
	}

	// UPDATE Status
	updateStatusForEmployee(customers: EmployeeModel[], status: number): Observable<any> {
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		const body = {
			customersForUpdate: customers,
			newStatus: status
		};
		const url = API_EMPLOYEES_URL + '/updateStatus';
		return this.http.put(url, body, { headers: httpHeaders });
	}

	// DELETE => delete the customer from the server
	deleteEmployee(customerId: number): Observable<EmployeeModel> {
		const url = `${API_EMPLOYEES_URL}/${customerId}`;
		return this.http.delete<EmployeeModel>(url);
	}

	deleteEmployees(ids: number[] = []): Observable<any> {
		const url = API_EMPLOYEES_URL + '/deleteEmployees';
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		const body = { customerIdsForDelete: ids };
		return this.http.put<QueryResultsModel>(url, body, { headers: httpHeaders} );
	}
}
