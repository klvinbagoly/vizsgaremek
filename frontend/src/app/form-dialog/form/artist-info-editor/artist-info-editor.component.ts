import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ArtistInfo } from 'src/app/model/artist-info';
import { ArtistInfoService } from 'src/app/service/artist-info.service';
import { ArtistInfoQuestionService } from '../../service/artist-info-question.service';
import { QuestionControlService } from '../../service/question-control.service';

@Component({
  selector: 'app-artist-info-editor',
  templateUrl: './artist-info-editor.component.html',
  styleUrls: ['./artist-info-editor.component.scss']
})
export class ArtistInfoEditorComponent implements OnInit {

  artistInfo: ArtistInfo = new ArtistInfo()
  questionsInfo: any[] = this.artistInfoQuestionService.getQuestions(this.artistInfo)
  formInfo: FormGroup = this.qcService.toFormGroup(this.questionsInfo)
  formSimilarArray: Array<FormGroup> = []
  formTagsArray: Array<FormGroup> = []

  name: string = ''


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { artistInfo: ArtistInfo, new: boolean },
    private artistInfoQuestionService: ArtistInfoQuestionService,

    private qcService: QuestionControlService,
    private artistInfoService: ArtistInfoService
  ) { }

  ngOnInit(): void {
    this.questionsInfo = this.artistInfoQuestionService.getQuestions(this.data.artistInfo)
    this.formInfo = this.qcService.toFormGroup(this.questionsInfo)

    const similar = this.formInfo.get('similar')
    const similarLength = this.questionsInfo.find(question => question.key === 'similar').value.length
    for (let i = 0; i < similarLength; i++) {
      const formGroup = similar?.get([i])
      const actualGroup = formGroup instanceof FormGroup ? formGroup : new FormGroup({ url: new FormControl(''), size: new FormControl('') })
      this.formSimilarArray[i] = actualGroup
    }

    const tags = this.formInfo.get('tags')
    const tagsLength = this.questionsInfo.find(question => question.key === 'tags').value.length
    for (let i = 0; i < tagsLength; i++) {
      const formGroup = tags?.get([i])
      const actualGroup = formGroup instanceof FormGroup ? formGroup : new FormGroup({ url: new FormControl(''), size: new FormControl('') })
      this.formTagsArray[i] = actualGroup
    }

    this.name = this.data.artistInfo.name
  }

  isNameValid() {
    return /^[ A-Űa-ű0-9,$\-\.!?+"'&@#]{1,30}$/.test(this.name)
  }

  addSimilar() {
    this.formSimilarArray.push(new FormGroup({
      name: new FormControl('', [Validators.required]),
      url: new FormControl('')
    }))
    this.questionsInfo[2].value.push(this.artistInfoQuestionService.createSimilarGroup([{
      image: []
    }]).flat())
  }

  deleteSimilar(index: number) {
    this.formSimilarArray.splice(index, 1)
    this.questionsInfo[2].value.splice(index, 1)
  }


  addTag() {
    this.formTagsArray.push(new FormGroup({
      name: new FormControl('', [Validators.required]),
      url: new FormControl('')
    }))
    this.questionsInfo[3].value.push(this.artistInfoQuestionService.createTagGroup([{}]).flat())
  }

  deleteTag(index: number) {
    this.formTagsArray.splice(index, 1)
    this.questionsInfo[3].value.splice(index, 1)
  }

  saveArtist() {
    this.artistInfo = this.data.artistInfo

    this.artistInfo.name = this.name
    this.artistInfo.ontour = this.formInfo.value.ontour
    this.artistInfo.bio.content = this.formInfo.value.bio
    this.artistInfo.bio.published = new Intl.DateTimeFormat('en-US', { dateStyle: 'long', timeStyle: 'short' }).format(new Date())

    this.artistInfo.similar.artist = this.formSimilarArray.map(formControl => formControl.value)
    this.artistInfo.tags.tag = this.formTagsArray.map(formControl => formControl.value)

    if (this.data.new) {
      delete this.artistInfo._id

      this.artistInfoService.create(this.artistInfo).subscribe(data => null)
    } else {
      this.artistInfoService.update(this.artistInfo).subscribe(data => null)
    }
  }

}
