import { CdkTableDataSourceInput } from '@angular/cdk/table';
import { Component, Input, OnInit } from '@angular/core';
import { AlbumInfoService } from 'src/app/service/album-info.service';

@Component({
  selector: 'ngx-data-table',
  templateUrl: './ngx-data-table.component.html',
  styleUrls: ['./ngx-data-table.component.scss']
})
export class NgxDataTableComponent<T> implements OnInit {

  constructor(
    private albumService: AlbumInfoService
  ) { }

  @Input() title!: string
  @Input() dataArray!: any[]
  dataSource!: CdkTableDataSourceInput<T>
  keys: string[] = []

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
  }

}
