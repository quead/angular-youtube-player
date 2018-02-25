import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { routes } from './app.router';

import { DragulaModule } from 'ng2-dragula/ng2-dragula';

import { AppComponent } from './app.component';
import { SharedService } from './shared/lists.service';
import { NwjsService } from './shared/nwjs.service';
import { YoutubeGetVideo } from './shared/youtube.service';
import { SettingsComponent } from './components/youtube-settings.component';
import { SearchComponent } from './components/youtube-search.component';
import { AboutComponent } from './components/youtube-about.component';
import { HistoryComponent } from './components/youtube-history.component';

import { YoutubePlayerModule } from 'ngx-youtube-player';
import { CategoryComponent } from './components/category/category.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    YoutubePlayerModule,
    FormsModule,
    DragulaModule,
    routes
  ],
  declarations: [
    AppComponent,
    SettingsComponent,
    SearchComponent,
    AboutComponent,
    HistoryComponent,
    CategoryComponent
  ],
  bootstrap:    [ AppComponent ],
  providers:    [ YoutubeGetVideo, SharedService, NwjsService ]
})

export class AppModule { }

