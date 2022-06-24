import { DataTableModule } from './data-table/data-table.module';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormDialogModule } from './form-dialog/form-dialog.module';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './common/header/header.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';




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
import { SortPipe } from './pipe/sort.pipe';
import { LoginComponent } from './pages/login/login.component';
import { JwtHandlerInterceptor } from './service/jwt-handler.interceptor';
import { AuthService } from './service/auth.service';
import { ConfirmDeleteComponent } from './common/confirm-delete/confirm-delete.component';
import { FooterComponent } from './common/footer/footer.component';
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
    SortPipe,
    LoginComponent,
    ConfirmDeleteComponent,
    FooterComponent,
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
    MatCardModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    FormDialogModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'hu-HU'
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtHandlerInterceptor,
      deps: [AuthService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
