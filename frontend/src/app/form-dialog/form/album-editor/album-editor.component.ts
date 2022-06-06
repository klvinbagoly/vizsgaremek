import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { AlbumInfo } from 'src/app/model/album-info';
import { Album } from 'src/app/model/album';
import { AlbumService } from 'src/app/service/album.service';
import { AlbumInfoService } from 'src/app/service/album-info.service';

@Component({
  selector: 'app-album-editor',
  templateUrl: './album-editor.component.html',
  styleUrls: ['./album-editor.component.scss']
})
export class AlbumEditorComponent implements OnInit {

  album: Album | undefined
  albumInfo: AlbumInfo | undefined

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Album | AlbumInfo,
    private albumService: AlbumService,
    private albumInfoService: AlbumInfoService
  ) { }

  ngOnInit(): void {
    if (this.data instanceof Album) {
      this.album = this.data
      this.findAlbumInfo(this.album.name)
    } else {
      this.albumInfo = this.data
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
      this.album = albums.flatMap(albums => albums.album).find(album => album.name === name)
    })
  }

}
