import { CdkTableDataSourceInput } from '@angular/cdk/table';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { AlbumEditorComponent } from 'src/app/form-dialog/form/album-editor/album-editor.component';
import { ArtistEditorComponent } from 'src/app/form-dialog/form/artist-editor/artist-editor.component';
import { Album } from 'src/app/model/album';
import { Artist } from 'src/app/model/artist';
import { AlbumInfoService } from 'src/app/service/album-info.service';
import { AuthService } from 'src/app/service/auth.service';
import { ConfigService, INgxTableColumn } from 'src/app/service/config.service';

@Component({
  selector: 'ngx-data-table',
  templateUrl: './ngx-data-table.component.html',
  styleUrls: ['./ngx-data-table.component.scss']
})
export class NgxDataTableComponent<T> implements OnInit {

  admin: boolean = false;

  constructor(
    private albumService: AlbumInfoService,
    private config: ConfigService,
    public dialog: MatDialog,
    private auth: AuthService
  ) { }

  @Input() type!: string // artist or album
  @Input() dataArray!: any[]
  dataSource: MatTableDataSource<T> = new MatTableDataSource<T>()
  pageSizes: number[] = [5, 10, 25, 100]
  dataSubscription!: Subscription
  columns!: INgxTableColumn[]
  displayedColumns!: string[]
  currentFilterKey: string = 'name'

  availableAlbums: string[] = []

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator

  ngOnInit(): void {
    this.columns = this.type === 'artist' ? this.config.artistColumns : this.config.albumColumns
    this.displayedColumns = this.columns.map(column => column.key)
    this.dataSource.filterPredicate = (data: { [key: string]: any }, filter: string) => {
      return String(data[this.currentFilterKey]).toLowerCase().includes(filter.toLowerCase())
    }
    this.auth.lastUser.subscribe((user) => {
      if (user && user.role === 3) {
        this.admin = true
      } else this.admin = false
    })
  }

  ngOnChanges(): void {
    this.generateTable(this.dataArray)
    if (this.type === 'album') {
      this.dataSubscription = this.albumService.getAll().subscribe(albums => {
        this.availableAlbums = albums.map(album => album.name)
      })
    }
  }

  generateTable(data: any[]) {
    this.dataSource.data = data
    this.dataSource.paginator = this.paginator
  }

  onEdit(data: any) {
    if (this.type === 'artist') {
      this.editArtist(data)
    } else {
      this.editAlbum(data)
    }
  }

  editArtist(artist: Artist) {
    const dialogRef = this.dialog.open(ArtistEditorComponent, {
      data: {
        artist: new Artist(artist),
        new: false
      }
    })
  }

  editAlbum(album: Album) {
    const dialogRef = this.dialog.open(AlbumEditorComponent, {
      data: {
        album: new Album(album),
        new: false
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }

  ngOnDestroy(): void {
    this.dataSubscription?.unsubscribe()
  }

}
