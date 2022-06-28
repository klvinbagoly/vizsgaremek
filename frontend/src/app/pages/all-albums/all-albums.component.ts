import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import { ConfirmDeleteComponent } from 'src/app/common/confirm-delete/confirm-delete.component';
import { AlbumEditorComponent } from 'src/app/form-dialog/form/album-editor/album-editor.component';
import { Album } from 'src/app/model/album';
import { TopAlbums } from 'src/app/model/top-albums';
import { SortPipe } from 'src/app/pipe/sort.pipe';
import { AlbumService } from 'src/app/service/album.service';
import { AuthService } from 'src/app/service/auth.service';
import { ConfigService } from 'src/app/service/config.service';

@Component({
  selector: 'app-all-albums',
  templateUrl: './all-albums.component.html',
  styleUrls: ['./all-albums.component.scss']
})
export class AllAlbumsComponent implements OnInit {

  topAlbums$: Observable<TopAlbums[]> = this.albumService.getAll()
  dataArray: Album[] = []

  columns = this.config.albumColumns

  dataSource: MatTableDataSource<Album> = new MatTableDataSource<Album>()
  pageSizes: number[] = [5, 10, 25, 100]
  dataSubscription!: Subscription
  displayedColumns!: string[]

  admin: boolean = false

  constructor(
    private albumService: AlbumService,
    private config: ConfigService,
    public dialog: MatDialog,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.topAlbums$.subscribe({
      next: albums => {
        this.dataArray = albums.flatMap(albums => albums.album.map(album => ({ ...album, top_id: albums._id })))
        this.displayedColumns = this.columns.map(column => column.key)
        this.generateTable(this.dataArray)
      }
    })

    this.dataSource.filterPredicate = (data: { [key: string]: any }, filter: string) => {
      return String(data['name']).toLowerCase().includes(filter.toLowerCase())
    }

    this.auth.lastUser.subscribe((user) => {
      if (user && user.role === 3) {
        this.admin = true
      } else this.admin = false
    })
  }

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator

  generateTable(data: any[]) {
    this.dataSource.data = data
    this.dataSource.paginator = this.paginator
  }

  sortDir: number = -1

  sortRows(key: string, type: string) {
    this.sortDir = - this.sortDir
    const sorter = new SortPipe()
    let keys = type === 'object' ? ['tags', 'tag', '0', 'name'] : type === 'artist' ? ['artist', 'name'] : [key]
    this.dataArray = sorter.transform(this.dataArray, this.sortDir, ...keys)
    this.generateTable(this.dataArray)
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }

  onEdit(album: Album) {
    const dialogRef = this.dialog.open(AlbumEditorComponent, {
      data: {
        album: new Album({ ...album, top_id: null }),
        new: false,
        top_id: album['top_id']
      }
    })
    dialogRef.afterClosed().subscribe({
      next: () => this.ngOnInit()
    })
  }

  onDelete(album: Album) {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      data: {
        title: `Delete album: ${album.name}`
      }
    })
    dialogRef.afterClosed().subscribe({
      next: (response) => {
        if (response) {
          this.albumService.deleteOneAlbum(album['top_id'], album._id || '')
            .subscribe({
              next: () => this.ngOnInit()
            })
        }
      }
    })
  }

}
