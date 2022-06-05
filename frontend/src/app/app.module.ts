import { DataTableModule } from './data-table/data-table.module';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './common/header/header.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';



import { HomeComponent } from './pages/home/home.component';
import { AllArtistsComponent } from './pages/all-artists/all-artists.component';
import { ArtistComponent } from './pages/artist/artist.component';
import { AlbumComponent } from './pages/album/album.component';
import { TagComponent } from './pages/tag/tag.component';
import { CardComponent } from './common/card/card.component';
import { TextoverflowPipe } from './pipe/textoverflow.pipe';
import { DeepPipe } from './pipe/deep.pipe';
import { registerLocaleData } from '@angular/common';
import localeHU from '@angular/common/locales/hu';
import { DurationPipe } from './pipe/duration.pipe';
import { SortPipe } from './pipe/sort.pipe'
registerLocaleData(localeHU)


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AllArtistsComponent,
    ArtistComponent,
    AlbumComponent,
    TagComponent,
    CardComponent,
    TextoverflowPipe,
    DeepPipe,
    DurationPipe,
    SortPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    DataTableModule,
    MatTableModule,
    MatCardModule
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'hu-HU'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
