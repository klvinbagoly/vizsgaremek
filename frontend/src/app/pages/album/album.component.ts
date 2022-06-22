import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ConfirmDeleteComponent } from 'src/app/common/confirm-delete/confirm-delete.component';
import { AlbumEditorComponent } from 'src/app/form-dialog/form/album-editor/album-editor.component';
import { TagEditorComponent } from 'src/app/form-dialog/form/tag-editor/tag-editor.component';
import { TrackEditorComponent } from 'src/app/form-dialog/form/track-editor/track-editor.component';
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

    dialogRef.afterClosed().subscribe(response => {
      this.albumInfoService.saveEvent.subscribe(() => {
        this.activeRoute.params.subscribe(params => this.findAlbum(params['name']))
      })
    })

  }

  addTag() {
    const dialogRef = this.dialog.open(TagEditorComponent, {
      data: {
        album: this.album,
        tag: new TagInfo(),
        new: true
      }
    })

    dialogRef.afterClosed().subscribe(response => {
      this.albumInfoService.saveEvent.subscribe(() => {
        this.activeRoute.params.subscribe(params => this.findAlbum(params['name']))
      })
    })
  }

  addTrack() {
    const dialogRef = this.dialog.open(TrackEditorComponent, {
      data: {
        track: new AlbumTrack(),
        album: this.album,
        new: true,
        rank: this.tracks?.length ? Number(this.tracks[this.tracks?.length - 1]['@attr'].rank) + 1 : 1
      }
    })
    dialogRef.afterClosed().subscribe(response => {
      this.albumInfoService.saveEvent.subscribe(() => {
        this.activeRoute.params.subscribe(params => this.findAlbum(params['name']))
      })
    })
  }

  updateTrack(track: AlbumTrack) {
    const dialogRef = this.dialog.open(TrackEditorComponent, {
      data: {
        track,
        album: this.album,
        new: false
      }
    })
    dialogRef.afterClosed().subscribe(response => {
      this.albumInfoService.saveEvent.subscribe(() => {
        this.activeRoute.params.subscribe(params => this.findAlbum(params['name']))
      })
    })
  }

  deleteTrack(track: AlbumTrack) {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      data: {
        title: `Delete track: ${track.name}`
      }
    })

    dialogRef.afterClosed().subscribe(response => {
      if (response) {
        const rank = track['@attr'].rank
        this.tracks?.forEach(track => {
          if (track['@attr'].rank > rank) track['@attr'].rank -= 1
        })
        const index = this.tracks?.findIndex(item => item._id === track._id) || 0
        this.tracks?.splice(index, 1)
        if (this.album) this.albumInfoService.update(this.album).subscribe(
          () => this.findAlbum(this.album?.name || '')
        )
      }
    })
  }

}
