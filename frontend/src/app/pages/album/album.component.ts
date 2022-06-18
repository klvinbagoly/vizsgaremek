import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AlbumEditorComponent } from 'src/app/form-dialog/form/album-editor/album-editor.component';
import { TagEditorComponent } from 'src/app/form-dialog/form/tag-editor/tag-editor.component';
import { AlbumInfo } from 'src/app/model/album-info';
import { AlbumTrack } from 'src/app/model/album-track';
import { TagInfo } from 'src/app/model/tag-info';
import { AlbumInfoService } from 'src/app/service/album-info.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {

  admin: boolean = false
  album!: AlbumInfo | undefined

  columns: string[] = ['rank', 'name', 'duration', 'artist']
  tracks: AlbumTrack[] | undefined

  constructor(
    private albumInfoService: AlbumInfoService,
    private activeRoute: ActivatedRoute,
    private dialog: MatDialog,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => this.findAlbum(params['name']))
    this.auth.lastUser.subscribe((user) => {
      if (user && user.role === 3) {
        this.admin = true
      } else this.admin = false
    })
    if (this.admin) this.columns.push('actions')
  }

  findAlbum(name: string) {
    this.albumInfoService.getOneByName(name).subscribe(data => {
      this.album = data

      // Single tracks are stored as object, converting to array
      if (this.album?.tracks.track && !Array.isArray(this.album?.tracks.track)) {
        this.tracks = [this.album?.tracks.track]
      }
      else this.tracks = this.album?.tracks.track
    })
  }

  onEdit(album: AlbumInfo = new AlbumInfo()) {
    const dialogRef = this.dialog.open(AlbumEditorComponent, {
      data: {
        album: new AlbumInfo(album),
        new: false,
        artist: album.artist
      }
    })
  }

  addTag() {
    const dialogRef = this.dialog.open(TagEditorComponent, {
      data: {
        album: this.album,
        tag: new TagInfo()
      }
    })
  }

}
