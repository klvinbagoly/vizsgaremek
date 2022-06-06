import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Artist } from 'src/app/model/artist';
import { ArtistInfo } from 'src/app/model/artist-info';
import { ArtistInfoService } from 'src/app/service/artist-info.service';
import { ArtistService } from 'src/app/service/artist.service';
import { InputQuestion } from '../../model/input-question';
import { Question } from '../../model/question';
import { SelectQuestion } from '../../model/select-question';
import { ArtistInfoQuestionService } from '../../service/artist-info-question.service';
import { ArtistQuestionService } from '../../service/artist-question.service';
import { QuestionControlService } from '../../service/question-control.service';

@Component({
  selector: 'app-artist-editor',
  templateUrl: './artist-editor.component.html',
  styleUrls: ['./artist-editor.component.scss']
})
export class ArtistEditorComponent implements OnInit {

  artist!: Artist | undefined
  artistInfo!: ArtistInfo | undefined
  questions: any[] = this.artistQuestionService.getQuestions(this.artist)
  questionsInfo: any[] = this.artistInfoQuestionService.getQuestions(this.artistInfo)
  form: FormGroup = this.qcService.toFormGroup(this.questions)
  formInfo: FormGroup = this.qcService.toFormGroup(this.questionsInfo)
  formImageArray: Array<FormGroup> = []
  formSimilarArray: Array<FormGroup> = []
  formTagsArray: Array<FormGroup> = []


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Artist | ArtistInfo,
    private artistQuestionService: ArtistQuestionService,
    private artistInfoQuestionService: ArtistInfoQuestionService,

    private qcService: QuestionControlService,
    private artistService: ArtistService,
    private artistInfoService: ArtistInfoService
  ) { }

  ngOnInit(): void {
    if (this.data instanceof Artist) {
      this.artist = this.data
      this.findArtistInfo(this.artist.name)
    } else {
      this.artistInfo = this.data
      this.findArtist(this.artistInfo.name)
    }
  }

  findArtistInfo(name: string) {
    this.artistInfoService.getAll().subscribe(artists => {
      this.artistInfo = artists.find(artist => artist.name === name) || new ArtistInfo()
      this.createQuestions()
    })
  }

  findArtist(name: string) {
    this.artistService.getAll().subscribe(artists => {
      this.artist = artists.find(artist => artist.name === name) || new Artist({})
      this.createQuestions()
    })
  }

  createQuestions() {
    this.questions = this.artistQuestionService.getQuestions(this.artist)
    this.form = this.qcService.toFormGroup(this.questions)
    const image = this.form.get('image')
    const imgLength = this.questions.find(question => question.key === 'image').value.length
    for (let i = 0; i < imgLength; i++) {
      const formGroup = image?.get([i])
      const actualGroup = formGroup instanceof FormGroup ? formGroup : new FormGroup({ url: new FormControl(''), size: new FormControl('') })
      this.formImageArray[i] = actualGroup
    }

    this.questionsInfo = this.artistInfoQuestionService.getQuestions(this.artistInfo)
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
    console.log(this.questionsInfo)
  }

}
