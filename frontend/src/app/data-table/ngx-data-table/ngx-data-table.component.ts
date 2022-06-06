import { CdkTableDataSourceInput } from '@angular/cdk/table';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlbumEditorComponent } from 'src/app/form-dialog/form/album-editor/album-editor.component';
import { ArtistEditorComponent } from 'src/app/form-dialog/form/artist-editor/artist-editor.component';
import { Album } from 'src/app/model/album';
import { Artist } from 'src/app/model/artist';
import { AlbumInfoService } from 'src/app/service/album-info.service';

@Component({
  selector: 'ngx-data-table',
  templateUrl: './ngx-data-table.component.html',
  styleUrls: ['./ngx-data-table.component.scss']
})
export class NgxDataTableComponent<T> implements OnInit {

  admin: boolean = true;

  constructor(
    private albumService: AlbumInfoService,
    public dialog: MatDialog
  ) { }

  @Input() title!: string
  @Input() dataArray!: any[]
  dataSource!: CdkTableDataSourceInput<T>
  keys: string[] = []
  columns: string[] = []

  availableAlbums: string[] = []

  ngOnInit(): void {
    this.generateTable(this.dataArray)
  }

  ngOnChanges(): void {
    this.generateTable(this.dataArray)
    if (this.title === 'album') {
      this.albumService.getAll().subscribe(albums => {
        this.availableAlbums = albums.map(album => album.name)
      })
    }
  }

  generateTable(data: any[]) {
    this.dataSource = data
    this.keys = Object.keys(data[0])
    this.columns = [...this.keys]
    if (this.admin) this.columns.push('actions')
  }

  onEdit(data: any) {
    if (this.title === 'artist') {
      this.editArtist(data)
    } else {
      this.editAlbum(data)
    }
  }

  editArtist(artist: Artist) {
    const dialogRef = this.dialog.open(ArtistEditorComponent, {
      data: new Artist(artist)
    })
  }

  editAlbum(album: Album) {
    const dialogRef = this.dialog.open(AlbumEditorComponent, {
      data: new Album(album)
    })
  }

}
