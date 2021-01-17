import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';

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
  declarations: [AuthComponent],
  imports: [
	CommonModule,
	RouterModule.forChild(routes)
  ],
  exports: [AuthComponent]
})

export class AuthModule {
	static forRoot(): ModuleWithProviders<any> {
		return {
			ngModule: AuthModule,
			providers: [
			]
		};
	}
}