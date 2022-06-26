import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { TagInfo } from 'src/app/model/tag-info';
import { ArtistInfo } from 'src/app/model/artist-info';
import { AlbumInfo } from 'src/app/model/album-info';
import { TagQuestionService } from '../../service/tag-question.service';
import { QuestionControlService } from '../../service/question-control.service';
import { TagService } from 'src/app/service/tag.service';
import { ArtistInfoService } from 'src/app/service/artist-info.service';
import { AlbumInfoService } from 'src/app/service/album-info.service';

@Component({
  selector: 'app-tag-editor',
  templateUrl: './tag-editor.component.html',
  styleUrls: ['./tag-editor.component.scss']
})
export class TagEditorComponent implements OnInit {

  tagInfo: TagInfo = new TagInfo()
  tagList: string[] = []
  shownTags: string[] = []
  editMode: boolean = true
  search: string = ''

  questions: any[] = this.tagQuestionService.getQuestions(this.tagInfo)
  form: FormGroup = this.qcService.toFormGroup(this.questions)

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      tag: TagInfo,
      new: boolean,
      artist?: ArtistInfo,
      album?: AlbumInfo
    },
    private tagQuestionService: TagQuestionService,
    private qcService: QuestionControlService,
    private tagService: TagService,
    private artistInfoService: ArtistInfoService,
    private albumInfoService: AlbumInfoService,
  ) { }

  ngOnInit(): void {
    if (this.data.new) {
      this.tagService.getAll().subscribe(tags => {
        this.tagList = tags.map(tag => tag.name)
      })
      this.editMode = false
    } else {
      this.tagInfo = this.data.tag
    }
    this.createQuestions()
  }

  createQuestions() {
    this.questions = this.tagQuestionService.getQuestions(this.tagInfo)
    this.form = this.qcService.toFormGroup(this.questions)
  }

  onSearch() {
    this.shownTags = this.tagList.filter(item => item.includes(this.search))
  }

  onSelect(event: MatSelectChange) {
    this.search = event.value
  }

  saveTag() {
    this.tagInfo.name = this.form.value.name
    this.tagInfo.reach = this.form.value.reach
    this.tagInfo.total = this.form.value.total
    this.tagInfo.url = this.form.value.url
    this.tagInfo.wiki.content = this.form.value.description
    this.tagInfo.wiki.published = new Intl.DateTimeFormat('en-US', { dateStyle: 'long', timeStyle: 'short' }).format(new Date())


    if (this.tagInfo._id === '') delete this.tagInfo._id

    if (this.data.new) {
      this.tagService.create(this.tagInfo).subscribe(data => null)
      this.addTag()
    } else {
      this.tagService.update(this.tagInfo).subscribe(data => null)
    }
  }

  addTag() {
    if (this.data.artist) {
      this.artistInfoService.addTag(this.data.artist._id || '', this.tagInfo)
        .subscribe(data => this.albumInfoService.saveEvent.next(null))
    }
    if (this.data.album) {
      this.albumInfoService.addTag(this.data.album._id || '', this.tagInfo)
        .subscribe(data => this.albumInfoService.saveEvent.next(null))
    }
  }

  getTag() {
    this.tagService.getOneByName(this.search).subscribe({
      next: (tag) => {
        this.tagInfo = tag
        this.addTag()
      },
      error: err => console.error(err)
    })
  }

}
