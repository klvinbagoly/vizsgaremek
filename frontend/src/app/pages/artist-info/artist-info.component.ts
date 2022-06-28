import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import { ConfirmDeleteComponent } from 'src/app/common/confirm-delete/confirm-delete.component';
import { ArtistInfoEditorComponent } from 'src/app/form-dialog/form/artist-info-editor/artist-info-editor.component';
import { ArtistInfo } from 'src/app/model/artist-info';
import { SortPipe } from 'src/app/pipe/sort.pipe';
import { ArtistInfoService } from 'src/app/service/artist-info.service';
import { AuthService } from 'src/app/service/auth.service';
import { ConfigService } from 'src/app/service/config.service';

@Component({
  selector: 'app-artist-info',
  templateUrl: './artist-info.component.html',
  styleUrls: ['./artist-info.component.scss']
})
export class ArtistInfoComponent implements OnInit {

  artists$: Observable<ArtistInfo[]> = this.artistInfoService.getAll()
  dataArray: ArtistInfo[] = []

  columns = this.config.artistInfoColumns

  dataSource: MatTableDataSource<ArtistInfo> = new MatTableDataSource<ArtistInfo>()
  pageSizes: number[] = [5, 10, 25, 100]
  dataSubscription!: Subscription
  displayedColumns!: string[]

  admin: boolean = false

  constructor(
    private artistInfoService: ArtistInfoService,
    private config: ConfigService,
    private auth: AuthService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.artists$.subscribe({
      next: artists => {
        this.dataArray = artists
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
    let keys = key === 'tags' ? ['tags', 'tag', '0', 'name'] : key === 'bio' ? ['bio', 'summary'] : [key]
    this.dataArray = sorter.transform(this.dataArray, this.sortDir, ...keys)
    this.generateTable(this.dataArray)
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }

  onEdit(artist: ArtistInfo) {
    const dialogRef = this.dialog.open(ArtistInfoEditorComponent, {
      data: {
        artistInfo: artist,
        new: false
      }
    })
    dialogRef.afterClosed().subscribe({
      next: () => this.ngOnInit()
    })
  }

  onDelete(artist: ArtistInfo) {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      data: {
        title: `Delete artist info: ${artist.name}`
      }
    })
    dialogRef.afterClosed().subscribe({
      next: (response) => {
        if (response) {
          this.artistInfoService.delete(artist._id || '')
            .subscribe({
              next: () => this.ngOnInit()
            })
        }
      }
    })
  }

  addArtist() {
    const dialogRef = this.dialog.open(ArtistInfoEditorComponent, {
      data: {
        artistInfo: new ArtistInfo(),
        new: true
      }
    })
    dialogRef.afterClosed().subscribe({
      next: () => this.ngOnInit()
    })
  }

}
