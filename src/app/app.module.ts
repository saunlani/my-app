import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { jqxGridComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxgrid';
import { jqxTreeGridComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxtreegrid';


import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatDialogModule, MatNativeDateModule, MatDatepickerModule } from "@angular/material";
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { BasicFormComponent } from './basic-form/basic-form.component';
import { NestedFormComponent } from './nested-form/nested-form.component';
import { ValidFormComponent } from './valid-form/valid-form.component';
import { AddDialogComponent } from './add-dialog/add-dialog.component';



@NgModule({
  declarations: [
    AppComponent, jqxGridComponent, jqxTreeGridComponent, 
    BasicFormComponent, NestedFormComponent, ValidFormComponent, AddDialogComponent,
  ],
  imports: [
    BrowserModule, FormsModule, BrowserAnimationsModule,
    ReactiveFormsModule, MatInputModule, MatSelectModule,
    MatButtonModule, MatCheckboxModule, MatChipsModule, MatDialogModule, MatNativeDateModule, MatDatepickerModule
  ],
  entryComponents: [ AddDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
