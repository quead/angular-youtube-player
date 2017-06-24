import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { routes } from './app.routes'

import { AppComponent } from './app.component';
import { YoutubeGetVideo } from './config/youtube.config';
import { SettingsComponent } from './components/youtube-settings.component';
import { SearchComponent } from './components/youtube-search.component';
import { AboutComponent } from './components/youtube-about.component';

import { YoutubePlayerModule } from 'ng2-youtube-player';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    YoutubePlayerModule,
    routes
  ],
  declarations: [
    AppComponent,
    SettingsComponent,
    SearchComponent,
    AboutComponent
  ],
  bootstrap:    [ AppComponent ],
  providers:    [ YoutubeGetVideo ]
})

export class AppModule { }

