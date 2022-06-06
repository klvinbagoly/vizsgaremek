import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-tag-editor',
  templateUrl: './tag-editor.component.html',
  styleUrls: ['./tag-editor.component.scss']
})
export class TagEditorComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { [key: string]: any }
  ) { }

  ngOnInit(): void {
    console.log(this.data)
  }

}
