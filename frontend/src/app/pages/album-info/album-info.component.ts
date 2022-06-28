import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import { AlbumInfo } from 'src/app/model/album-info';
import { SortPipe } from 'src/app/pipe/sort.pipe';
import { AlbumInfoService } from 'src/app/service/album-info.service';
import { AuthService } from 'src/app/service/auth.service';
import { ConfigService } from 'src/app/service/config.service';
import { AlbumInfoEditorComponent } from 'src/app/form-dialog/form/album-info-editor/album-info-editor.component';
import { ConfirmDeleteComponent } from 'src/app/common/confirm-delete/confirm-delete.component';

@Component({
  selector: 'app-album-info',
  templateUrl: './album-info.component.html',
  styleUrls: ['./album-info.component.scss']
})
export class AlbumInfoComponent implements OnInit {

  albums$: Observable<AlbumInfo[]> = this.albumInfoService.getAll()
  dataArray: AlbumInfo[] = []

  columns = this.config.albumInfoColumns

  dataSource: MatTableDataSource<AlbumInfo> = new MatTableDataSource<AlbumInfo>()
  pageSizes: number[] = [5, 10, 25, 100]
  dataSubscription!: Subscription
  displayedColumns!: string[]

  admin: boolean = false

  constructor(
    private albumInfoService: AlbumInfoService,
    private config: ConfigService,
    private auth: AuthService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.albums$.subscribe({
      next: albums => {
        this.dataArray = albums
        this.displayedColumns = this.columns.map(column => column.key)
        this.generateTable(this.dataArray)

      }
    })

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
    let keys = type === 'array' ? ['image', '0', 'url'] : type === 'artist' ? ['artist', 'name'] : [key]
    this.dataArray = sorter.transform(this.dataArray, this.sortDir, ...keys)
    this.generateTable(this.dataArray)
  }

  onEdit(album: AlbumInfo) {
    const dialogRef = this.dialog.open(AlbumInfoEditorComponent, {
      data: {
        albumInfo: album,
        new: false
      }
    })
    dialogRef.afterClosed().subscribe({
      next: () => this.ngOnInit()
    })

  }

  onDelete(album: AlbumInfo) {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      data: {
        title: `Delete album info: ${album.name}`
      }
    })
    dialogRef.afterClosed().subscribe({
      next: (response) => {
        if (response) {
          this.albumInfoService.delete(album._id || '')
            .subscribe({
              next: () => this.ngOnInit()
            })
        }
      }
    })
  }

  addAlbum() {
    const dialogRef = this.dialog.open(AlbumInfoEditorComponent, {
      data: {
        albumInfo: new AlbumInfo(),
        new: true
      }
    })
    dialogRef.afterClosed().subscribe({
      next: () => this.ngOnInit()
    })
  }

}
