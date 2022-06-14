import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { TagEditorComponent } from 'src/app/form-dialog/form/tag-editor/tag-editor.component';
import { TagInfo } from 'src/app/model/tag-info';
import { TagService } from 'src/app/service/tag.service';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {

  admin: boolean = true
  tag: TagInfo | undefined

  constructor(
    private tagService: TagService,
    private activeRoute: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => this.findTag(params['name']))
  }

  findTag(name: string): void {
    this.tagService.getOneByName(name).subscribe(tag => {
      this.tag = tag
    })
  }

  editTag() {
    const dialogRef = this.dialog.open(TagEditorComponent, {
      data: {
        tag: this.tag || new TagInfo()
      }
    })
  }

}
