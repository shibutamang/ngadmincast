// NGRX
import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
// CRUD
import { QueryParamsModel } from '../../_base/models/query-models/query-params.model';
// Models
import { EmployeeModel } from '../_models/employee.model';

export enum EmployeeActionTypes {
    EmployeeOnServerCreated = '[Edit Employee Dialog] Employee On Server Created',
    EmployeeCreated = '[Edit Employee Dialog] Employee Created',
    EmployeeUpdated = '[Edit Employee Dialog] Employee Updated',
    EmployeesStatusUpdated = '[Employee List Page] Employees Status Updated',
    OneEmployeeDeleted = '[Employees List Page] One Employee Deleted',
    ManyEmployeesDeleted = '[Employees List Page] Many Employee Deleted',
    EmployeesPageRequested = '[Employees List Page] Employees Page Requested',
    EmployeesPageLoaded = '[Employees API] Employees Page Loaded',
    EmployeesPageCancelled = '[Employees API] Employees Page Cancelled',
    EmployeesPageToggleLoading = '[Employees] Employees Page Toggle Loading',
    EmployeeActionToggleLoading = '[Employees] Employees Action Toggle Loading'
}

export class EmployeeOnServerCreated implements Action {
    readonly type = EmployeeActionTypes.EmployeeOnServerCreated;
    constructor(public payload: { employee: EmployeeModel }) { }
}

export class EmployeeCreated implements Action {
    readonly type = EmployeeActionTypes.EmployeeCreated;
    constructor(public payload: { employee: EmployeeModel }) { }
}

export class EmployeeUpdated implements Action {
    readonly type = EmployeeActionTypes.EmployeeUpdated;
    constructor(public payload: {
        partialEmployee: Update<EmployeeModel>, // For State update
        employee: EmployeeModel // For Server update (through service)
    }) { }
}

export class EmployeesStatusUpdated implements Action {
    readonly type = EmployeeActionTypes.EmployeesStatusUpdated;
    constructor(public payload: {
        employees: EmployeeModel[],
        status: number
    }) { }
}

export class OneEmployeeDeleted implements Action {
    readonly type = EmployeeActionTypes.OneEmployeeDeleted;
    constructor(public payload: { id: number }) {}
}

export class ManyEmployeesDeleted implements Action {
    readonly type = EmployeeActionTypes.ManyEmployeesDeleted;
    constructor(public payload: { ids: number[] }) {}
}

export class EmployeesPageRequested implements Action {
    readonly type = EmployeeActionTypes.EmployeesPageRequested;
    constructor(public payload: { page: QueryParamsModel }) { }
}

export class EmployeesPageLoaded implements Action {
    readonly type = EmployeeActionTypes.EmployeesPageLoaded;
    constructor(public payload: { employees: EmployeeModel[], totalCount: number, page: QueryParamsModel }) { }
}

export class EmployeesPageCancelled implements Action {
    readonly type = EmployeeActionTypes.EmployeesPageCancelled;
}

export class EmployeesPageToggleLoading implements Action {
    readonly type = EmployeeActionTypes.EmployeesPageToggleLoading;
    constructor(public payload: { isLoading: boolean }) { }
}

export class EmployeeActionToggleLoading implements Action {
    readonly type = EmployeeActionTypes.EmployeeActionToggleLoading;
    constructor(public payload: { isLoading: boolean }) { }
}

export type EmployeeActions = EmployeeOnServerCreated
| EmployeeCreated
| EmployeeUpdated
| EmployeesStatusUpdated
| OneEmployeeDeleted
| ManyEmployeesDeleted
| EmployeesPageRequested
| EmployeesPageLoaded
| EmployeesPageCancelled
| EmployeesPageToggleLoading
| EmployeeActionToggleLoading;
