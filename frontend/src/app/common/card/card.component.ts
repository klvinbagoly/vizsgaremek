import { Component, Input, OnInit } from '@angular/core';
import { ArtistInfo } from 'src/app/model/artist-info';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() artist!: ArtistInfo
  constructor() { }

  ngOnInit(): void {
  }

}
