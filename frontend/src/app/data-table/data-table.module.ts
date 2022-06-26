import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';


import { NgxDataTableComponent } from './ngx-data-table/ngx-data-table.component';
import { DeepPipe } from './pipe/deep.pipe';
import { TextoverflowPipe } from './pipe/textoverflow.pipe';
import { LinkPipe } from './pipe/link.pipe';




@NgModule({
  declarations: [
    NgxDataTableComponent,
    DeepPipe,
    TextoverflowPipe,
    LinkPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule
  ],
  exports: [
    NgxDataTableComponent
  ]
})
export class DataTableModule { }
