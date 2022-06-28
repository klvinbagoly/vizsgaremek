import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlbumInfo } from 'src/app/model/album-info';
import { Wiki } from 'src/app/model/tag-info';
import { AlbumInfoService } from 'src/app/service/album-info.service';
import { AlbumInfoQuestionService } from '../../service/album-info-question.service';
import { ArtistInfoQuestionService } from '../../service/artist-info-question.service';
import { QuestionControlService } from '../../service/question-control.service';

@Component({
  selector: 'app-album-info-editor',
  templateUrl: './album-info-editor.component.html',
  styleUrls: ['./album-info-editor.component.scss']
})
export class AlbumInfoEditorComponent implements OnInit {

  albumInfo: AlbumInfo = new AlbumInfo()
  questionsInfo: any[] = this.albumInfoQuestionService.getGuestions(this.albumInfo)
  formInfo: FormGroup = this.qcService.toFormGroup(this.questionsInfo)
  formTagsArray: Array<FormGroup> = []

  name: string = ''

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { albumInfo: AlbumInfo, new: boolean },
    private albumInfoQuestionService: AlbumInfoQuestionService,

    private qcService: QuestionControlService,
    private albumInfoService: AlbumInfoService,
    private artistInfoQuestionService: ArtistInfoQuestionService
  ) { }

  ngOnInit(): void {
    this.questionsInfo = this.albumInfoQuestionService.getGuestions(this.data.albumInfo)
    this.formInfo = this.qcService.toFormGroup(this.questionsInfo)

    const tags = this.formInfo.get('tags')
    const tagsLength = this.questionsInfo.find(question => question.key === 'tags').value.length
    for (let i = 0; i < tagsLength; i++) {
      const formGroup = tags?.get([i])
      const actualGroup = formGroup instanceof FormGroup ? formGroup : new FormGroup({ url: new FormControl(''), size: new FormControl('') })
      this.formTagsArray[i] = actualGroup
    }

    this.name = this.data.albumInfo.name
  }

  addTag() {
    this.formTagsArray.push(new FormGroup({
      name: new FormControl('', [Validators.required]),
      url: new FormControl('')
    }))
    this.questionsInfo[2].value.push(this.artistInfoQuestionService.createTagGroup([{}]).flat())
  }

  deleteTag(index: number) {
    this.formTagsArray.splice(index, 1)
    this.questionsInfo[2].value.splice(index, 1)
  }

  isNameValid() {
    return /^[ A-Űa-ű0-9,$\-\.!?+"'&@#]{1,30}$/.test(this.name)
  }

  saveAlbum() {
    this.albumInfo = this.data.albumInfo

    this.albumInfo.name = this.name
    this.albumInfo.listeners = this.formInfo.value.listeners
    this.albumInfo.tags.tag = this.formTagsArray.map(formControl => formControl.value)
    this.albumInfo.wiki = this.albumInfo.wiki || new Wiki()
    this.albumInfo.wiki.content = this.formInfo.value.description
    this.albumInfo.wiki.published = new Intl.DateTimeFormat('en-US', { dateStyle: 'long', timeStyle: 'short' }).format(new Date())

    if (this.data.new) {
      delete this.albumInfo._id
      this.albumInfoService.create(this.albumInfo).subscribe(data => null)
    } else {
      this.albumInfoService.update(this.albumInfo).subscribe(data => this.albumInfoService.saveEvent.next(null))
    }
  }

}
