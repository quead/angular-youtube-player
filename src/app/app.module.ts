import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app.router';

import { DragulaModule } from 'ng2-dragula';
import { NguCarouselModule, NguCarouselConfig, NguCarousel } from '@ngu/carousel';

import { AppComponent } from './app.component';
import { DbCrudService } from './services/db-crud.service';
import { GlobalsService } from './services/globals.service';
import { SharedService } from './services/shared.service';
import { YoutubeGetVideo } from './services/youtube.service';
import { PlaylistControlService } from './services/playlist-control.service';
import { SettingsComponent } from './components/youtube-settings.component';
import { SearchComponent } from './components/youtube-search.component';
import { AboutComponent } from './components/youtube-about.component';
import { HistoryComponent } from './components/youtube-history.component';
import { PlayerComponent } from './components/player/player.component';

import { YoutubePlayerModule } from 'ngx-youtube-player';
import { CategoryComponent } from './components/category/category.component';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabase } from '@angular/fire/database';

import { environment } from '../environments/environment';
import { PlaylistComponent } from './components/playlist/playlist.component';
import { RelatedComponent } from './components/related/related.component';

@NgModule({
  imports: [
    AngularFireModule.initializeApp(environment.firebase, 'angular-yt-player-quead'),
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    YoutubePlayerModule,
    FormsModule,
    DragulaModule.forRoot(),
    NguCarouselModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    SettingsComponent,
    SearchComponent,
    AboutComponent,
    HistoryComponent,
    CategoryComponent,
    PlayerComponent,
    PlaylistComponent,
    RelatedComponent
  ],
  bootstrap: [ AppComponent ],
  providers: [
    DbCrudService,
    PlayerComponent,
    PlaylistComponent,
    YoutubeGetVideo,
    PlaylistControlService,
    SharedService,
    GlobalsService,
    AngularFireDatabase,
    NguCarouselConfig,
    NguCarousel
  ]
})

export class AppModule { }

