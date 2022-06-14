import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
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

  artist!: Artist
  artistInfo!: ArtistInfo
  questions: any[] = this.artistQuestionService.getQuestions(this.artist)
  questionsInfo: any[] = this.artistInfoQuestionService.getQuestions(this.artistInfo)
  form: FormGroup = this.qcService.toFormGroup(this.questions)
  formInfo: FormGroup = this.qcService.toFormGroup(this.questionsInfo)
  formImageArray: Array<FormGroup> = []
  formSimilarArray: Array<FormGroup> = []
  formTagsArray: Array<FormGroup> = []


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { artist: Artist | ArtistInfo, new: boolean },
    private artistQuestionService: ArtistQuestionService,
    private artistInfoQuestionService: ArtistInfoQuestionService,

    private qcService: QuestionControlService,
    private artistService: ArtistService,
    private artistInfoService: ArtistInfoService
  ) { }

  ngOnInit(): void {
    if (this.data.artist instanceof Artist) {
      this.artist = this.data.artist
      this.findArtistInfo(this.artist.name)
    } else {
      this.artistInfo = this.data.artist
      this.findArtist(this.artistInfo.name)
    }
  }

  findArtistInfo(name: string) {
    this.artistInfoService.getOneByName(name).subscribe(artist => {
      this.artistInfo = artist || new ArtistInfo()
      this.createQuestions()
    })
  }

  findArtist(name: string) {
    this.artistService.getOneByName(name).subscribe(artist => {
      this.artist = artist || new Artist({})
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

  addImage() {
    this.formImageArray.push(new FormGroup({
      url: new FormControl(''), size: new FormControl('')
    }))
    this.questions[6].value.push(this.artistQuestionService.createImageGroup([{}]).flat())
  }

  deleteImage(index: number) {
    this.formImageArray.splice(index, 1)
    this.questions[6].value.splice(index, 1)
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
    this.artist = this.form.value
    this.artist.image = this.formImageArray.map(formControl => formControl.value)

    this.artistInfo.name = this.artist.name
    this.artistInfo.url = this.artist.url
    this.artistInfo.image = this.artist.image
    this.artistInfo.streamable = this.artist.streamable
    this.artistInfo.mbid = this.artist.mbid
    this.artistInfo.stats = {
      listeners: this.artist.listeners,
      playcount: this.artist.playcount
    }
    this.artistInfo.ontour = this.formInfo.value.ontour
    this.artistInfo.bio.content = this.formInfo.value.bio
    this.artistInfo.bio.published = new Intl.DateTimeFormat('en-US', { dateStyle: 'long', timeStyle: 'short' }).format(new Date())

    this.artistInfo.similar.artist = this.formSimilarArray.map(formControl => formControl.value)
    this.artistInfo.tags.tag = this.formTagsArray.map(formControl => formControl.value)

    if (this.data.new) {
      this.artist.id = Math.round(Math.random() * 2 ** 50).toString(16)
      this.artistInfo.id = this.artist.id
    }

    if (this.data.new) {
      this.artistService.create(this.artist).subscribe(data => console.log(data))
      this.artistInfoService.create(this.artistInfo).subscribe(data => console.log(data))
    } else {
      this.artistService.update(this.artist).subscribe(data => console.log(data))
      this.artistInfoService.update(this.artistInfo).subscribe(data => console.log(data))
    }
  }

}
