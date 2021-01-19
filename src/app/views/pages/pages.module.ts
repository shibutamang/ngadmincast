import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';
import { HttpClientModule } from '@angular/common/http';

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
    HttpClientModule,
    RouterModule.forChild(routes),
    MatPaginatorModule,
    MatButtonModule,
    FormsModule,
		CoreModule,
  ]
})
export class PagesModule { }
