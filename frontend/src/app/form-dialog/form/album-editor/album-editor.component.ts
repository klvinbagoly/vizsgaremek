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

  album!: Album
  albumInfo!: AlbumInfo

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      album: Album | AlbumInfo,
      new: boolean,
      artist?: ArtistInfo
    },
    private albumService: AlbumService,
    private albumInfoService: AlbumInfoService
  ) { }

  ngOnInit(): void {
    if (this.data.album instanceof Album) {
      this.album = this.data.album
      this.findAlbumInfo(this.album.name)
    } else {
      this.albumInfo = this.data.album
      this.findAlbum(this.albumInfo.name)
    }
  }

  findAlbumInfo(name: string) {
    this.albumInfoService.getAll().subscribe(albums => {
      this.albumInfo = albums.find(album => album.name === name) || new AlbumInfo()
    })
  }

  findAlbum(name: string) {
    this.albumService.getAll().subscribe(albums => {
      this.album = albums.flatMap(albums => albums.album).find(album => album.name === name) || new Album({})
    })
  }

}
