import { MatDialogModule } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistEditorComponent } from './form/artist-editor/artist-editor.component';
import { AlbumEditorComponent } from './form/album-editor/album-editor.component';
import { TagEditorComponent } from './form/tag-editor/tag-editor.component';
import { FormInputComponent } from './form/form-input/form-input.component';
import { ReactiveFormsModule } from '@angular/forms';




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
    MatDialogModule
  ],
  exports: [
    ArtistEditorComponent,
    AlbumEditorComponent,
    TagEditorComponent,
  ]
})
export class FormDialogModule { }
