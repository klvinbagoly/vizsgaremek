import { Component, Input, OnInit } from '@angular/core';
import { Artist } from 'src/app/model/artist';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() artist!: Artist
  constructor() { }

  ngOnInit(): void {
  }

}
