import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ArtistEditorComponent } from 'src/app/form-dialog/form/artist-editor/artist-editor.component';
import { Artist } from 'src/app/model/artist';
import { ArtistService } from 'src/app/service/artist.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-all-artists',
  templateUrl: './all-artists.component.html',
  styleUrls: ['./all-artists.component.scss']
})
export class AllArtistsComponent implements OnInit {

  artists$: Observable<Artist[]> = this.artistService.getAll()

  admin: boolean = false

  constructor(
    private artistService: ArtistService,
    public dialog: MatDialog,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.auth.lastUser.subscribe((user) => {
      if (user && user.role === 3) {
        this.admin = true
      } else this.admin = false
    })
  }

  addArtist() {
    const dialogRef = this.dialog.open(ArtistEditorComponent, {
      data: {
        artist: new Artist(),
        new: true
      }
    })

    dialogRef.afterClosed().subscribe(data => {
      console.log(data)
    })
  }


}
