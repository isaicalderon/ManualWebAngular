import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'; 
import {AccordionModule} from 'primeng/accordion'; 
import {MenuItem} from 'primeng/api'; 
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'; 
// componentes
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {MenubarModule} from 'primeng/menubar';
import {TableModule} from 'primeng/table';
import { AlumnoService } from './services/alumno.services';
import {DialogModule} from 'primeng/dialog';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AccordionModule,
    FormsModule,
    BreadcrumbModule,
    MenubarModule,
    TableModule,
    HttpClientModule,
    DialogModule
    //MenuItem
  ],

  providers: [
    AlumnoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
