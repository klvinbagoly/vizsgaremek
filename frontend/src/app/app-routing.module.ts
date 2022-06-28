import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumInfoComponent } from './pages/album-info/album-info.component';
import { AlbumComponent } from './pages/album/album.component';
import { AllArtistsComponent } from './pages/all-artists/all-artists.component';
import { ArtistInfoComponent } from './pages/artist-info/artist-info.component';
import { ArtistComponent } from './pages/artist/artist.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { TagInfoComponent } from './pages/tag-info/tag-info.component';
import { TagComponent } from './pages/tag/tag.component';
import { AuthGuardService } from './service/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'all-artists',
    component: AllArtistsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'artist/:name',
    component: ArtistComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'album/:name',
    component: AlbumComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'tag/:name',
    component: TagComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'albumInfo',
    component: AlbumInfoComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'artistInfo',
    component: ArtistInfoComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'tagInfo',
    component: TagInfoComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
