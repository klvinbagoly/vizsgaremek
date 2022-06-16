import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumComponent } from './pages/album/album.component';
import { AllArtistsComponent } from './pages/all-artists/all-artists.component';
import { ArtistComponent } from './pages/artist/artist.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { TagComponent } from './pages/tag/tag.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'all-artists',
    component: AllArtistsComponent
  },
  {
    path: 'artist/:name',
    component: ArtistComponent
  },
  {
    path: 'album/:name',
    component: AlbumComponent
  },
  {
    path: 'tag/:name',
    component: TagComponent
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
