import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDataTableComponent } from './ngx-data-table/ngx-data-table.component';

import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


import { DeepPipe } from './pipe/deep.pipe';
import { TextoverflowPipe } from './pipe/textoverflow.pipe';
import { LinkPipe } from './pipe/link.pipe';
import { RouterModule } from '@angular/router';




@NgModule({
  declarations: [
    NgxDataTableComponent,
    DeepPipe,
    TextoverflowPipe,
    LinkPipe
  ],
  imports: [
    CommonModule,
    MatTableModule,
    RouterModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [
    NgxDataTableComponent
  ]
})
export class DataTableModule { }
