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
  form: FormGroup = this.qcService.toFormGroup(this.questions)
  formImageArray: Array<FormGroup> = []

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Artist | ArtistInfo,
    private artistQuestionService: ArtistQuestionService,
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
    console.log(this.formImageArray)
  }

}
