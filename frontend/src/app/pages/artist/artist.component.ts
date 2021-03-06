import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AlbumEditorComponent } from 'src/app/form-dialog/form/album-editor/album-editor.component';
import { ArtistEditorComponent } from 'src/app/form-dialog/form/artist-editor/artist-editor.component';
import { TagEditorComponent } from 'src/app/form-dialog/form/tag-editor/tag-editor.component';
import { Album } from 'src/app/model/album';
import { ArtistInfo } from 'src/app/model/artist-info';
import { TagInfo } from 'src/app/model/tag-info';
import { AlbumInfoService } from 'src/app/service/album-info.service';
import { AlbumService } from 'src/app/service/album.service';
import { ArtistInfoService } from 'src/app/service/artist-info.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit {

  admin: boolean = false

  artist!: ArtistInfo | undefined
  topAlbums!: Album[] | undefined
  topAlbumsId: string = ''

  constructor(
    private artistInfoService: ArtistInfoService,
    private albumService: AlbumService,
    private activeRoute: ActivatedRoute,
    private dialog: MatDialog,
    private auth: AuthService,
    private albumInfoService: AlbumInfoService
  ) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => this.findArtist(params['name']))
    this.auth.lastUser.subscribe((user) => {
      if (user && user.role === 3) {
        this.admin = true
      } else this.admin = false
    })
  }

  findArtist(name: string) {
    this.artistInfoService.getOneByName(name).subscribe(data => {
      this.artist = data
    })
    this.albumService.getTopAlbumsByArtist(name).subscribe(data => {
      if (data) {
        this.topAlbums = data.album
        this.topAlbumsId = data._id || ''
      } else this.topAlbums = undefined
    })
  }

  onEdit(data: ArtistInfo = new ArtistInfo()) {
    const dialogRef = this.dialog.open(ArtistEditorComponent, {
      data: {
        artist: data,
        new: this.artist ? false : true
      }
    })
  }

  addAlbum() {
    const dialogRef = this.dialog.open(AlbumEditorComponent, {
      data: {
        artist: this.artist?.name,
        album: new Album({}),
        new: true,
        top_id: this.topAlbumsId
      }
    })

    dialogRef.afterClosed().subscribe(data => {
      this.albumService.getTopAlbumsByArtist(this.activeRoute.snapshot.params['name'])
        .subscribe(albums => this.topAlbums = albums.album)
    })
  }

  addTag() {
    const dialogRef = this.dialog.open(TagEditorComponent, {
      data: {
        artist: this.artist,
        tag: new TagInfo(),
        new: true
      }
    })
    dialogRef.afterClosed().subscribe(response => {
      if (response) {
        this.albumInfoService.saveEvent.subscribe(() => {
          this.artistInfoService.getOneByName(this.artist?.name || '').subscribe(data => {
            this.artist = data
          })
        })
      }
    })
  }

  onDeleteAlbum(albumid: string) {
    this.albumService.deleteOneAlbum(this.topAlbumsId, albumid).subscribe(() => {
      this.albumService.getTopAlbumsByArtist(this.activeRoute.snapshot.params['name'])
        .subscribe(albums => this.topAlbums = albums.album)
    })
  }

}
