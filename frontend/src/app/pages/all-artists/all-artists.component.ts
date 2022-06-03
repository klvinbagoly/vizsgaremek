import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Artist } from 'src/app/model/artist';
import { ArtistService } from 'src/app/service/artist.service';

@Component({
  selector: 'app-all-artists',
  templateUrl: './all-artists.component.html',
  styleUrls: ['./all-artists.component.scss']
})
export class AllArtistsComponent implements OnInit {

  artists$: Observable<Artist[]> = this.artistService.getAll()

  constructor(
    private artistService: ArtistService
  ) { }

  ngOnInit(): void {
  }



}
