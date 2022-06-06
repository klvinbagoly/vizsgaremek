import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Artist } from 'src/app/model/artist';
import { ArtistQuestionService } from '../../service/artist-question.service';
import { QuestionControlService } from '../../service/question-control.service';

@Component({
  selector: 'app-artist-editor',
  templateUrl: './artist-editor.component.html',
  styleUrls: ['./artist-editor.component.scss']
})
export class ArtistEditorComponent implements OnInit {

  questions: any[] = this.artistQuestionService.getQuestions(this.artist)
  form: FormGroup = this.qcService.toFormGroup(this.questions)

  constructor(
    @Inject(MAT_DIALOG_DATA) public artist: Artist,
    private artistQuestionService: ArtistQuestionService,
    private qcService: QuestionControlService
  ) { }

  ngOnInit(): void {
  }

}
