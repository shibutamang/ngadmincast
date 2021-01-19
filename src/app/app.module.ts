import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator'; 
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'; 
import { PagesModule } from './views/pages/pages.module';
import { AuthModule } from './views/pages/auth/auth.module';
import { LayoutModule } from './views/layout/layout.module';
import { ScriptLoaderService } from './core/_base/layout/script-loader.service';
import { CoreModule } from './core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { HttpUtilsService } from './core/_base';

// NGRX
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

// State
import { metaReducers, reducers } from './core/reducer';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    LayoutModule,
    PagesModule,
    AuthModule.forRoot(),
    StoreModule.forRoot(reducers, {metaReducers}),
		EffectsModule.forRoot([]),
  ],
  providers: [
    ScriptLoaderService,
    HttpUtilsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
