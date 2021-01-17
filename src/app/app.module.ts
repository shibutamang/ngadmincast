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

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    LayoutModule,
    PagesModule,
    AuthModule
  ],
  providers: [ScriptLoaderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
