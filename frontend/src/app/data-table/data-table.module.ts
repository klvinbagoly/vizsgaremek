import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDataTableComponent } from './ngx-data-table/ngx-data-table.component';

import { MatTableModule } from '@angular/material/table';




@NgModule({
  declarations: [
    NgxDataTableComponent
  ],
  imports: [
    CommonModule,
    MatTableModule
  ],
  exports: [
    NgxDataTableComponent
  ]
})
export class DataTableModule { }
