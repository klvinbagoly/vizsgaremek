import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AlbumTrack } from 'src/app/model/album-track';
import { AlbumInfo } from 'src/app/model/album-info';
import { QuestionControlService } from '../../service/question-control.service';
import { InputQuestion } from '../../model/input-question';
import { TrackQuestionService } from '../../service/track-question.service';
import { ArtistService } from 'src/app/service/artist.service';
import { AlbumInfoService } from 'src/app/service/album-info.service';

@Component({
  selector: 'app-track-editor',
  templateUrl: './track-editor.component.html',
  styleUrls: ['./track-editor.component.scss']
})
export class TrackEditorComponent implements OnInit {

  form: FormGroup = new FormGroup({})
  questions: InputQuestion[] = []

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      track: AlbumTrack,
      new: boolean,
      album: AlbumInfo,
      rank?: number
    },
    private albumInfoService: AlbumInfoService,
    private artistService: ArtistService,
    private qcService: QuestionControlService,
    private trackQuestionService: TrackQuestionService
  ) { }

  ngOnInit(): void {
    if (this.data.new) {
      this.artistService.getOneByName(this.data.album.artist).subscribe(
        artist => {
          this.data.track.artist = {
            name: artist.name,
            url: artist.url,
            mbid: artist.mbid
          }
          this.createQuestions()
        }
      )
    } else this.createQuestions()
  }

  createQuestions() {
    this.questions = this.trackQuestionService.getQuestions(this.data.track)
    this.form = this.qcService.toFormGroup(this.questions)
  }

  saveTrack(form: FormGroup) {
    this.data.track = {
      _id: this.data.track._id || undefined,
      name: form.value.name,
      url: form.value.url,
      duration: parseInt(form.value.minutes) * 60 + parseInt(form.value.seconds),
      artist: {
        name: form.value.artist,
        url: form.value.artistUrl,
        mbid: form.value.artistMbid
      },
      streamable: this.data.track.streamable,
      '@attr': this.data.track['@attr']
    }

    if (this.data.rank) this.data.track['@attr'].rank = this.data.rank

    if (this.data.new) {
      this.albumInfoService.addTrack(this.data.album._id || '', this.data.track)
        .subscribe(() => this.albumInfoService.saveEvent.next(null))
    } else {
      this.albumInfoService.updateTrack(this.data.album._id || '', this.data.track)
        .subscribe(() => this.albumInfoService.saveEvent.next(null))
    }
  }

}
