// NGRX
import { createFeatureSelector, createSelector } from '@ngrx/store';
// Lodash
import { each } from 'lodash';
// CRUD
import { QueryResultsModel, HttpExtenstionsModel } from '../../_base';
// State
import { EmployeesState } from '../_reducers/employee.reducers';
import { EmployeeModel } from '../_models/employee.model';

export const selectEmployeesState = createFeatureSelector<EmployeesState>('customers');

export const selectEmployeeById = (customerId: number) => createSelector(
    selectEmployeesState,
    customersState => customersState.entities[customerId]
);

export const selectEmployeesPageLoading = createSelector(
    selectEmployeesState,
    customersState => customersState.listLoading
);

export const selectEmployeesActionLoading = createSelector(
    selectEmployeesState,
    customersState => customersState.actionsloading
);

export const selectLastCreatedEmployeeId = createSelector(
    selectEmployeesState,
    customersState => customersState.lastCreatedEmployeeId
);

export const selectEmployeesShowInitWaitingMessage = createSelector(
    selectEmployeesState,
    customersState => customersState.showInitWaitingMessage
);

export const selectEmployeesInStore = createSelector(
    selectEmployeesState,
    customersState => {
        const items: EmployeeModel[] = [];
        each(customersState.entities, element => {
            items.push(element);
        });
        const httpExtension = new HttpExtenstionsModel();
        const result: EmployeeModel[] = httpExtension.sortArray(items, customersState.lastQuery.sortField, customersState.lastQuery.sortOrder);
        return new QueryResultsModel(result, customersState.totalCount, '');
    }
);
