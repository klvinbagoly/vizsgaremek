import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ArtistEditorComponent } from './form/artist-editor/artist-editor.component';
import { AlbumEditorComponent } from './form/album-editor/album-editor.component';
import { TagEditorComponent } from './form/tag-editor/tag-editor.component';
import { TrackEditorComponent } from './form/track-editor/track-editor.component';
import { FormInputComponent } from './form/form-input/form-input.component';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';




@NgModule({
  declarations: [
    ArtistEditorComponent,
    AlbumEditorComponent,
    TagEditorComponent,
    FormInputComponent,
    TrackEditorComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule
  ],
  exports: [
    ArtistEditorComponent,
    AlbumEditorComponent,
    TagEditorComponent,
    TrackEditorComponent
  ]
})
export class FormDialogModule { }
