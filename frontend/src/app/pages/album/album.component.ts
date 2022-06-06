import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlbumInfo } from 'src/app/model/album-info';
import { AlbumTrack } from 'src/app/model/album-track';
import { AlbumInfoService } from 'src/app/service/album-info.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {

  admin: boolean = true
  album!: AlbumInfo | undefined

  columns: string[] = ['rank', 'name', 'duration', 'artist']
  tracks: AlbumTrack[] | undefined

  constructor(
    private albumInfoService: AlbumInfoService,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => this.findAlbum(params['id']))
    if (this.admin) this.columns.push('actions')
  }

  findAlbum(name: string) {
    this.albumInfoService.getAll().subscribe(data => {
      this.album = data.find(album => album.name === name)

      // hogy 1 track esetén is megjelenjen
      if (this.album?.tracks.track && !Array.isArray(this.album?.tracks.track)) {
        this.tracks = [this.album?.tracks.track]
      }
      else this.tracks = this.album?.tracks.track
    })
  }

}
