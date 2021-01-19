// NGRX
import { createFeatureSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter, Update } from '@ngrx/entity';
// Actions
import { EmployeeActions, EmployeeActionTypes } from '../_actions/employee.actions';
// Models
import { EmployeeModel } from '../_models/employee.model';
import { QueryParamsModel } from '../../_base';

export interface EmployeesState extends EntityState<EmployeeModel> {
    listLoading: boolean;
    actionsloading: boolean;
    totalCount: number;
    lastCreatedEmployeeId: number;
    lastQuery: QueryParamsModel;
    showInitWaitingMessage: boolean;
}

export const adapter: EntityAdapter<EmployeeModel> = createEntityAdapter<EmployeeModel>();

export const initialEmployeesState: EmployeesState = adapter.getInitialState({
    employeeForEdit: null,
    listLoading: false,
    actionsloading: false,
    totalCount: 0,
    lastCreatedEmployeeId: undefined,
    lastQuery: new QueryParamsModel({}),
    showInitWaitingMessage: true
});

export function employeesReducer(state = initialEmployeesState, action: EmployeeActions): EmployeesState {
    switch  (action.type) {
        case EmployeeActionTypes.EmployeesPageToggleLoading: {
            return {
                ...state, listLoading: action.payload.isLoading, lastCreatedEmployeeId: undefined
            };
        }
        case EmployeeActionTypes.EmployeeActionToggleLoading: {
            return {
                ...state, actionsloading: action.payload.isLoading
            };
        }
        case EmployeeActionTypes.EmployeeOnServerCreated: return {
            ...state
        };
        case EmployeeActionTypes.EmployeeCreated: return adapter.addOne(action.payload.employee, {
            ...state, lastCreatedEmployeeId: action.payload.employee.id
        });
        case EmployeeActionTypes.EmployeeUpdated: return adapter.updateOne(action.payload.partialEmployee, state);
        case EmployeeActionTypes.EmployeesStatusUpdated: {
            const _partialEmployees: Update<EmployeeModel>[] = [];
            // tslint:disable-next-line:prefer-const
            for (let i = 0; i < action.payload.employees.length; i++) {
                _partialEmployees.push({
				    id: action.payload.employees[i].id,
				    changes: {
                        status: action.payload.status
                    }
			    });
            }
            return adapter.updateMany(_partialEmployees, state);
        }
        case EmployeeActionTypes.OneEmployeeDeleted: return adapter.removeOne(action.payload.id, state);
        case EmployeeActionTypes.ManyEmployeesDeleted: return adapter.removeMany(action.payload.ids, state);
        case EmployeeActionTypes.EmployeesPageCancelled: {
            return {
                ...state, listLoading: false, lastQuery: new QueryParamsModel({})
            };
        }
        case EmployeeActionTypes.EmployeesPageLoaded: {
            return adapter.addMany(action.payload.employees, {
                ...initialEmployeesState,
                totalCount: action.payload.totalCount,
                listLoading: false,
                lastQuery: action.payload.page,
                showInitWaitingMessage: false
            });
        }
        default: return state;
    }
}

export const getEmployeeState = createFeatureSelector<EmployeeModel>('employees');

export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal
} = adapter.getSelectors();
