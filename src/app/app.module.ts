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

import { PlaylistComponent } from './components/playlist/playlist.component';
import { RelatedComponent } from './components/related/related.component';
import { RoomComponent } from './components/room/room.component';

@NgModule({
  imports: [
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
    RelatedComponent,
    RoomComponent
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
    NguCarouselConfig,
    NguCarousel
  ]
})

export class AppModule { }

