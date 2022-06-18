import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { AlbumInfo } from 'src/app/model/album-info';
import { Album } from 'src/app/model/album';
import { AlbumService } from 'src/app/service/album.service';
import { AlbumInfoService } from 'src/app/service/album-info.service';
import { ArtistInfo } from 'src/app/model/artist-info';
import { AlbumQuestionService } from '../../service/album-question.service';
import { AlbumInfoQuestionService } from '../../service/album-info-question.service';
import { QuestionControlService } from '../../service/question-control.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ArtistQuestionService } from '../../service/artist-question.service';
import { ArtistInfoQuestionService } from '../../service/artist-info-question.service';

@Component({
  selector: 'app-album-editor',
  templateUrl: './album-editor.component.html',
  styleUrls: ['./album-editor.component.scss']
})
export class AlbumEditorComponent implements OnInit {

  album: Album = new Album()
  albumInfo: AlbumInfo = new AlbumInfo()
  questions: any[] = this.albumQuestionService.getQuestions(this.album)
  questionsInfo: any[] = this.albumInfoQuestionService.getGuestions(this.albumInfo)
  form: FormGroup = this.qcService.toFormGroup(this.questions)
  formInfo: FormGroup = this.qcService.toFormGroup(this.questionsInfo)
  formImageArray: Array<FormGroup> = []
  formTagsArray: Array<FormGroup> = []

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      album: Album | AlbumInfo,
      new: boolean,
      artist?: string
    },
    private albumService: AlbumService,
    private albumInfoService: AlbumInfoService,
    private albumQuestionService: AlbumQuestionService,
    private albumInfoQuestionService: AlbumInfoQuestionService,
    private qcService: QuestionControlService,
    private artistQuestionService: ArtistQuestionService,
    private artistInfoQuestionService: ArtistInfoQuestionService,
  ) { }

  ngOnInit(): void {
    if (!this.data.new) {
      if (this.data.album instanceof Album) {
        this.album = this.data.album
        this.findAlbumInfo(this.album.name)
      } else {
        this.albumInfo = this.data.album
        this.findAlbum(this.albumInfo.name)
      }
    } else this.createQuestions()
  }

  findAlbumInfo(name: string) {
    this.albumInfoService.getOneByName(name).subscribe(album => {
      this.albumInfo = album || new AlbumInfo()
      this.createQuestions()
    })
  }

  findAlbum(name: string) {
    if (this.data.artist) {
      this.albumService.getTopAlbumsByArtist(this.data.artist).subscribe(albums => {
        this.album = albums.album.find(album => album.name === name) || new Album({})
        this.createQuestions()
      })
    } else this.createQuestions()
  }

  createQuestions() {
    this.questions = this.albumQuestionService.getQuestions(this.album)
    this.form = this.qcService.toFormGroup(this.questions)

    const image = this.form.get('image')
    const imgLength = this.questions.find(question => question.key === 'image').value.length
    for (let i = 0; i < imgLength; i++) {
      const formGroup = image?.get([i])
      const actualGroup = formGroup instanceof FormGroup ? formGroup : new FormGroup({ url: new FormControl(''), size: new FormControl('') })
      this.formImageArray[i] = actualGroup
    }

    this.questionsInfo = this.albumInfoQuestionService.getGuestions(this.albumInfo)
    this.formInfo = this.qcService.toFormGroup(this.questionsInfo)

    const tags = this.formInfo.get('tags')
    const tagsLength = this.questionsInfo.find(question => question.key === 'tags').value.length
    for (let i = 0; i < tagsLength; i++) {
      const formGroup = tags?.get([i])
      const actualGroup = formGroup instanceof FormGroup ? formGroup : new FormGroup({ url: new FormControl(''), size: new FormControl('') })
      this.formTagsArray[i] = actualGroup
    }
  }

  addImage() {
    this.formImageArray.push(new FormGroup({
      url: new FormControl(''), size: new FormControl('')
    }))
    this.questions[4].value.push(this.artistQuestionService.createImageGroup([{}]).flat())
  }

  deleteImage(index: number) {
    this.formImageArray.splice(index, 1)
    this.questions[4].value.splice(index, 1)
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

  saveAlbum() { }
}
