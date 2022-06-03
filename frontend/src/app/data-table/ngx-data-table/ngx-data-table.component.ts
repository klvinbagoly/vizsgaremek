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

  @Input() dataArray!: Observable<any[]>
  dataSource!: CdkTableDataSourceInput<T>

  ngOnInit(): void {
    this.dataArray.subscribe({
      next: (data) => {
        this.generateTable(data)
      }
    })
  }

  generateTable(data: any[]) {
    this.dataSource = data
  }

}
