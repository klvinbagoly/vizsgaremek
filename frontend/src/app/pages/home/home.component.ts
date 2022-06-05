import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ArtistInfo } from 'src/app/model/artist-info';
import { ArtistInfoService } from 'src/app/service/artist-info.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  artists$: Observable<ArtistInfo[]> = this.artistService.getAll()

  constructor(
    private artistService: ArtistInfoService
  ) { }

  ngOnInit(): void {
  }

}
