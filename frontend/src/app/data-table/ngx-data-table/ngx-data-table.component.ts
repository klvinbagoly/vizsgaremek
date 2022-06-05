import { CdkTableDataSourceInput } from '@angular/cdk/table';
import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';

@Component({
  selector: 'ngx-data-table',
  templateUrl: './ngx-data-table.component.html',
  styleUrls: ['./ngx-data-table.component.scss']
})
export class NgxDataTableComponent<T> implements OnInit {

  constructor() { }

  @Input() title!: string
  @Input() dataArray!: any[]
  dataSource!: CdkTableDataSourceInput<T>
  keys: string[] = []

  ngOnInit(): void {
    this.generateTable(this.dataArray)
  }

  generateTable(data: any[]) {
    this.dataSource = data
    this.keys = Object.keys(data[0])
  }

}
