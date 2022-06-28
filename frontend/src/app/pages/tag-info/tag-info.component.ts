import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import { ConfirmDeleteComponent } from 'src/app/common/confirm-delete/confirm-delete.component';
import { TagEditorComponent } from 'src/app/form-dialog/form/tag-editor/tag-editor.component';
import { TagInfo } from 'src/app/model/tag-info';
import { SortPipe } from 'src/app/pipe/sort.pipe';
import { AuthService } from 'src/app/service/auth.service';
import { ConfigService } from 'src/app/service/config.service';
import { TagService } from 'src/app/service/tag.service';

@Component({
  selector: 'app-tag-info',
  templateUrl: './tag-info.component.html',
  styleUrls: ['./tag-info.component.scss']
})
export class TagInfoComponent implements OnInit {


  tags$: Observable<TagInfo[]> = this.tagInfoService.getAll()
  dataArray: TagInfo[] = []

  columns = this.config.tagInfoColumns

  dataSource: MatTableDataSource<TagInfo> = new MatTableDataSource<TagInfo>()
  pageSizes: number[] = [5, 10, 25, 100]
  dataSubscription!: Subscription
  displayedColumns!: string[]

  admin: boolean = false

  constructor(
    private tagInfoService: TagService,
    private config: ConfigService,
    private auth: AuthService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.tags$.subscribe({
      next: tags => {
        this.dataArray = tags
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

  onEdit(tag: TagInfo) {
    const dialogRef = this.dialog.open(TagEditorComponent, {
      data: {
        tag: tag,
        new: false
      }
    })
    dialogRef.afterClosed().subscribe({
      next: () => this.ngOnInit()
    })
  }

  onDelete(tag: TagInfo) {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      data: {
        title: `Delete tag info: ${tag.name}`
      }
    })
    dialogRef.afterClosed().subscribe({
      next: (response) => {
        if (response) {
          this.tagInfoService.delete(tag._id || '')
            .subscribe({
              next: () => this.ngOnInit()
            })
        }
      }
    })
  }

  addTag() {
    const dialogRef = this.dialog.open(TagEditorComponent, {
      data: {
        tag: new TagInfo(),
        new: false
      }
    })
    dialogRef.afterClosed().subscribe({
      next: () => this.ngOnInit()
    })
  }

}
