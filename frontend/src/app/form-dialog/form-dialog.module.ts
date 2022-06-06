import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistEditorComponent } from './form/artist-editor/artist-editor.component';
import { AlbumEditorComponent } from './form/album-editor/album-editor.component';
import { TagEditorComponent } from './form/tag-editor/tag-editor.component';
import { FormInputComponent } from './form/form-input/form-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



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
    FormsModule
  ],
  exports: [
    ReactiveFormsModule,
    FormInputComponent,
    ArtistEditorComponent
  ]
})
export class FormDialogModule { }
