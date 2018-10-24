import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { routes } from './app.router';

import { DragulaModule } from 'ng2-dragula/ng2-dragula';
import { NguCarouselModule, NguCarousel } from '@ngu/carousel';

import { AppComponent } from './app.component';
import { GlobalsService } from './services/globals.service';
import { SharedService } from './services/shared.service';
import { YoutubeGetVideo } from './services/youtube.service';
import { PlaylistControlService } from './services/playlist-control.service';
import { AuthService } from './services/auth.service';
import { SettingsComponent } from './components/youtube-settings.component';
import { SearchComponent } from './components/youtube-search.component';
import { AboutComponent } from './components/youtube-about.component';
import { HistoryComponent } from './components/youtube-history.component';
import { PlayerComponent } from './components/player/player.component';

import { YoutubePlayerModule } from 'ngx-youtube-player';
import { CategoryComponent } from './components/category/category.component';

// Firebase
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';

import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import { environment } from '../environments/environment';
import { PlaylistComponent } from './components/playlist/playlist.component';
import { RelatedComponent } from './components/related/related.component';

@NgModule({
  imports: [
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase, 'angular-yt-player-quead'),
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    YoutubePlayerModule,
    FormsModule,
    DragulaModule,
    NguCarouselModule,
    routes
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
  bootstrap:    [ AppComponent ],
  providers:    [ PlayerComponent, PlaylistComponent, YoutubeGetVideo, PlaylistControlService, SharedService, GlobalsService, AngularFireAuth, AngularFireDatabase, AuthService, NguCarousel ]
})

export class AppModule { }

