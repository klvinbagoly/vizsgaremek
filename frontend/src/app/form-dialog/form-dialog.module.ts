import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistEditorComponent } from './form/artist-editor/artist-editor.component';
import { AlbumEditorComponent } from './form/album-editor/album-editor.component';
import { TagEditorComponent } from './form/tag-editor/tag-editor.component';
import { FormInputComponent } from './form/form-input/form-input.component';
import { ReactiveFormsModule } from '@angular/forms';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';




@NgModule({
  declarations: [
    ArtistEditorComponent,
    AlbumEditorComponent,
    TagEditorComponent,
    FormInputComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule
  ],
  exports: [
    ArtistEditorComponent,
    AlbumEditorComponent,
    TagEditorComponent,
  ]
})
export class FormDialogModule { }
