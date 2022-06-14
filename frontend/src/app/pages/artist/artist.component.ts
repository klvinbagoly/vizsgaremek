import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AlbumEditorComponent } from 'src/app/form-dialog/form/album-editor/album-editor.component';
import { ArtistEditorComponent } from 'src/app/form-dialog/form/artist-editor/artist-editor.component';
import { TagEditorComponent } from 'src/app/form-dialog/form/tag-editor/tag-editor.component';
import { Album } from 'src/app/model/album';
import { ArtistInfo } from 'src/app/model/artist-info';
import { TagInfo } from 'src/app/model/tag-info';
import { AlbumService } from 'src/app/service/album.service';
import { ArtistInfoService } from 'src/app/service/artist-info.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit {

  admin: boolean = true

  artist!: ArtistInfo | undefined
  topAlbums!: Album[] | undefined

  constructor(
    private artistInfoService: ArtistInfoService,
    private albumService: AlbumService,
    private activeRoute: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => this.findArtist(params['name']))
  }

  findArtist(name: string) {
    this.artistInfoService.getOneByName(name).subscribe(data => {
      this.artist = data
    })
    this.albumService.getTopAlbumsByArtist(name).subscribe(data => {
      this.topAlbums = data.album
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
        artist: this.artist,
        album: new Album({}),
        new: true
      }
    })
  }

  addTag() {
    const dialogRef = this.dialog.open(TagEditorComponent, {
      data: {
        artist: this.artist,
        tag: new TagInfo()
      }
    })
  }

}
