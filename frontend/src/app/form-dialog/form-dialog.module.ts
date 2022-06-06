import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistEditorComponent } from './artist-editor/artist-editor.component';
import { AlbumEditorComponent } from './album-editor/album-editor.component';
import { TagEditorComponent } from './tag-editor/tag-editor.component';



@NgModule({
  declarations: [
    ArtistEditorComponent,
    AlbumEditorComponent,
    TagEditorComponent
  ],
  imports: [
    CommonModule
  ]
})
export class FormDialogModule { }
