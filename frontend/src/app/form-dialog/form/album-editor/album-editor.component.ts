import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { AlbumInfo } from 'src/app/model/album-info';
import { Album } from 'src/app/model/album';
import { AlbumService } from 'src/app/service/album.service';
import { AlbumInfoService } from 'src/app/service/album-info.service';
import { ArtistInfo } from 'src/app/model/artist-info';

@Component({
  selector: 'app-album-editor',
  templateUrl: './album-editor.component.html',
  styleUrls: ['./album-editor.component.scss']
})
export class AlbumEditorComponent implements OnInit {

  album: Album = new Album()
  albumInfo: AlbumInfo = new AlbumInfo()

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      album: Album | AlbumInfo,
      new: boolean,
      artist?: string
    },
    private albumService: AlbumService,
    private albumInfoService: AlbumInfoService
  ) { }

  ngOnInit(): void {
    if (!this.data.new) {
      if (this.data.album instanceof Album) {
        this.album = this.data.album
        this.findAlbumInfo(this.album.name)
      } else {
        this.albumInfo = this.data.album
        this.findAlbum(this.albumInfo.name)
      }
    }
  }

  findAlbumInfo(name: string) {
    this.albumInfoService.getOneByName(name).subscribe(album => {
      this.albumInfo = album || new AlbumInfo()
    })
  }

  findAlbum(name: string) {
    if (this.data.artist) {
      this.albumService.getTopAlbumsByArtist(this.data.artist).subscribe(albums => {
        this.album = albums.album.find(album => album.name === name) || new Album({})
      })
    }
  }

}
