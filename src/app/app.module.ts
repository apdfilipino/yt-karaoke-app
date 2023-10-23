import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgFor } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchComponent } from './search/search.component';
import { SearchItemComponent } from './search-item/search-item.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { PlaylistComponent } from './playlist/playlist.component';
import { PlaylistItemComponent } from './playlist-item/playlist-item.component';
import { SearchBoxComponent } from './search-box/search-box.component';
import { PlayerComponent } from './player/player.component';
import { StoreModule } from '@ngrx/store';
import { YoutubeService } from './service/youtube.service';
import { searchListReducer } from './video-store/search.reducers';
import { HttpClientModule } from '@angular/common/http';
import { videosReducer } from './video-store/video.reducers';
import { YouTubePlayerModule } from '@angular/youtube-player';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    SearchItemComponent,
    PlaylistComponent,
    PlaylistItemComponent,
    SearchBoxComponent,
    PlayerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgFor,
    NgIf,
    MatGridListModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    HttpClientModule,
    YouTubePlayerModule,
    StoreModule.forRoot({ searchList: searchListReducer, playlist: videosReducer }, {})
  ],
  providers: [
    YoutubeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
