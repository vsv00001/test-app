import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import  {AgGridModule} from 'ag-grid-angular';
import {HttpClientModule} from '@angular/common/http';
import {EventService} from './event.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgGridModule.withComponents([]),
    HttpClientModule
  ],
  providers: [ EventService],
  bootstrap: [AppComponent]
})
export class AppModule { }
