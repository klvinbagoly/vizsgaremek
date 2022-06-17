import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { TagEditorComponent } from 'src/app/form-dialog/form/tag-editor/tag-editor.component';
import { TagInfo } from 'src/app/model/tag-info';
import { AuthService } from 'src/app/service/auth.service';
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
    public dialog: MatDialog,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => this.findTag(params['name']))
    this.auth.lastUser.subscribe((user) => {
      if (user && user.role === 3) {
        this.admin = true
      } else this.admin = false
    })
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
