import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Artist } from 'src/app/model/artist';
import { ArtistInfo } from 'src/app/model/artist-info';
import { ArtistInfoService } from 'src/app/service/artist-info.service';
import { ArtistService } from 'src/app/service/artist.service';
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
  // form: FormGroup = this.qcService.toFormGroup(this.questions)

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
    })
  }

  findArtist(name: string) {
    this.artistService.getAll().subscribe(artists => {
      this.artist = artists.find(artist => artist.name === name) || new Artist({})
    })
  }

}
