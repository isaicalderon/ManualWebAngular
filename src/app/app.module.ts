import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'; 
import {AccordionModule} from 'primeng/accordion'; 
import {MenuItem} from 'primeng/api'; 
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

// componentes
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {MenubarModule} from 'primeng/menubar';
import {TableModule} from 'primeng/table';

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
    TableModule
    //MenuItem
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
