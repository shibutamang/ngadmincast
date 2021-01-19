import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// NGRX
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
// Auth
import { AuthEffects, AuthGuard, authReducer, AuthService } from '../../../core/auth';

const routes: Routes = [
	{
		path: '',
		component: AuthComponent,
		children: [ 
			{
				path: 'login',
				component: LoginComponent,
				data: {returnUrl: window.location.pathname}
			}
		]
	}
];

@NgModule({
  declarations: [AuthComponent,LoginComponent],
  imports: [
	CommonModule,
	FormsModule,
	ReactiveFormsModule,
	RouterModule.forChild(routes),
	StoreModule.forFeature('auth', authReducer),
	EffectsModule.forFeature([AuthEffects])
  ],
  exports: [AuthComponent]
})

export class AuthModule {
	static forRoot(): ModuleWithProviders<any> {
		return {
			ngModule: AuthModule,
			providers: [
				AuthService,
				AuthGuard
			]
		};
	}
}