
import { forkJoin } from 'rxjs';
// Angular
import { Injectable } from '@angular/core';
// RxJS
import { mergeMap, map, tap, delay } from 'rxjs/operators';
// NGRX
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
// CRUD
import { QueryResultsModel } from '../../_base';
// Services
import { EmployeesService } from '../_services/';
// State
import { AppState } from '../../reducer';
// Actions
import {
    EmployeeActionTypes,
    EmployeesPageRequested,
    EmployeesPageLoaded,
    ManyEmployeesDeleted,
    OneEmployeeDeleted,
    EmployeeActionToggleLoading,
    EmployeesPageToggleLoading,
    EmployeeUpdated,
    EmployeesStatusUpdated,
    EmployeeCreated,
	EmployeeOnServerCreated
} from '../_actions/employee.actions';
import { of } from 'rxjs';
import { QueryParamsModel } from '../../_base';


@Injectable()
export class EmployeeEffects {
    showPageLoadingDistpatcher = new EmployeesPageToggleLoading({ isLoading: true });
    showActionLoadingDistpatcher = new EmployeeActionToggleLoading({ isLoading: true });
    hideActionLoadingDistpatcher = new EmployeeActionToggleLoading({ isLoading: false });
 
    @Effect()
    loadEmployeesPage$ = this.actions$.pipe(
        ofType<EmployeesPageRequested>(EmployeeActionTypes.EmployeesPageRequested),
        mergeMap(( { payload } ) => {
            this.store.dispatch(this.showPageLoadingDistpatcher);
            const requestToServer = this.customersService.findEmployees(payload.page);
            const lastQuery = of(payload.page);
            return forkJoin(requestToServer, lastQuery);
        }),
        map(response => {
            const result: QueryResultsModel = response[0];
            const lastQuery: QueryParamsModel = response[1];
			const pageLoadedDispatch = new EmployeesPageLoaded({
				employees: result.items,
                totalCount: result.totalCount,
                page: lastQuery
            });
            return pageLoadedDispatch;
        })
    );

    @Effect()
    deleteEmployee$ = this.actions$
        .pipe(
            ofType<OneEmployeeDeleted>(EmployeeActionTypes.OneEmployeeDeleted),
            mergeMap(( { payload } ) => {
                    this.store.dispatch(this.showActionLoadingDistpatcher);
                    return this.customersService.deleteEmployee(payload.id);
                }
            ),
            map(() => {
                return this.hideActionLoadingDistpatcher;
            }),
        );

    @Effect()
    deleteEmployees$ = this.actions$
        .pipe(
            ofType<ManyEmployeesDeleted>(EmployeeActionTypes.ManyEmployeesDeleted),
            mergeMap(( { payload } ) => {
                    this.store.dispatch(this.showActionLoadingDistpatcher);
                    return this.customersService.deleteEmployees(payload.ids);
                }
            ),
            map(() => {
                return this.hideActionLoadingDistpatcher;
            }),
        );

    @Effect()
    updateEmployee$ = this.actions$
        .pipe(
            ofType<EmployeeUpdated>(EmployeeActionTypes.EmployeeUpdated),
            mergeMap(( { payload } ) => {
				this.store.dispatch(this.showActionLoadingDistpatcher);
				return this.customersService.updateEmployee(payload.employee);
            }),
            map(() => {
                return this.hideActionLoadingDistpatcher;
            })
        );

    @Effect()
    updateEmployeesStatus$ = this.actions$
        .pipe(
            ofType<EmployeesStatusUpdated>(EmployeeActionTypes.EmployeesStatusUpdated),
            mergeMap(( { payload } ) => {
				this.store.dispatch(this.showActionLoadingDistpatcher);
				return this.customersService.updateStatusForEmployee(payload.employees, payload.status);
            }),
            map(() => {
                return this.hideActionLoadingDistpatcher;
            })
        );

    @Effect()
    createEmployee$ = this.actions$
        .pipe(
            ofType<EmployeeOnServerCreated>(EmployeeActionTypes.EmployeeOnServerCreated),
            mergeMap(( { payload } ) => {
				this.store.dispatch(this.showActionLoadingDistpatcher);
				return this.customersService.createEmployee(payload.employee).pipe(
                    tap(res => {
						this.store.dispatch(new EmployeeCreated({ employee: res }));
                    })
                );
            }),
            map(() => {
                return this.hideActionLoadingDistpatcher;
            }),
        );

    constructor(private actions$: Actions, private customersService: EmployeesService, private store: Store<AppState>) { }
}
