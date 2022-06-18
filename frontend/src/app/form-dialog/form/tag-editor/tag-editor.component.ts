import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { TagInfo } from 'src/app/model/tag-info';
import { ArtistInfo } from 'src/app/model/artist-info';
import { AlbumInfo } from 'src/app/model/album-info';
import { TagQuestionService } from '../../service/tag-question.service';
import { QuestionControlService } from '../../service/question-control.service';
import { TagService } from 'src/app/service/tag.service';

@Component({
  selector: 'app-tag-editor',
  templateUrl: './tag-editor.component.html',
  styleUrls: ['./tag-editor.component.scss']
})
export class TagEditorComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      tag: TagInfo,
      new: boolean,
      artist?: ArtistInfo,
      album?: AlbumInfo
    },
    private tagQuestionService: TagQuestionService,
    private qcService: QuestionControlService,
    private tagService: TagService
  ) { }

  ngOnInit(): void {
    console.log(this.data)
  }

}
