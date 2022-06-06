import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Album } from 'src/app/model/album';
import { ArtistInfo } from 'src/app/model/artist-info';
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
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => this.findArtist(params['id']))
  }

  findArtist(name: string) {
    this.artistInfoService.getAll().subscribe(data => {
      this.artist = data.find(artist => artist.name === name)
    })
    this.albumService.getAll().subscribe(data => {
      const albums = data.find(album => album['@attr'].artist === name)
      this.topAlbums = albums?.album
    })
  }

}
