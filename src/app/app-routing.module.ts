import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
import { LayoutComponent } from './views/layout/layout.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./../app/views/pages/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: '',
    component: LayoutComponent,
		children: [
			{
				path: '',
				loadChildren: () => import('./../app/views/pages/pages.module').then(m => m.PagesModule),
      }
		],
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
