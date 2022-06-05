import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Artist } from 'src/app/model/artist';
import { ArtistService } from 'src/app/service/artist.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  artists$: Observable<Artist[]> = this.artistService.getAll()

  constructor(
    private artistService: ArtistService
  ) { }

  ngOnInit(): void {
  }

}
