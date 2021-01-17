import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';

const routes: Routes = [
	{
		path: 'dashboard',
		component: DashboardComponent
  },
  {
    path: '',
    redirectTo:'dashboard',
    pathMatch: 'full'
	}
];

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatPaginatorModule,
    MatButtonModule
  ]
})
export class PagesModule { }
