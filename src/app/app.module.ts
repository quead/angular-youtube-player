import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import {
  NguCarousel,
  NguCarouselConfig,
  NguCarouselModule,
} from '@ngu/carousel';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { FeedComponent } from './pages/feed/feed.component';
import { CategoryComponent } from './components/category/category.component';
import { environment } from 'src/environments/environment';
import { VideoItemComponent } from './components/video-item/video-item.component';
import { VideoItemEnhancedComponent } from './components/video-item/video-item-enhanced/video-item-enhanced.component';
import { VideoItemGridComponent } from './components/video-item/video-item-grid/video-item-grid.component';
import { VideoItemListComponent } from './components/video-item/video-item-list/video-item-list.component';
import { ButtonsComponent } from './components/player/buttons/buttons.component';
import { ShortNumPipe } from './pipes/short-num.pipe';
import { CategoryBadgeComponent } from './components/category/category-badge/category-badge.component';
import { PlayerComponent } from './components/player/player.component';
import { SearchComponent } from './components/search/search.component';
import { RelatedComponent } from './components/related/related.component';
import { YoutubeIframeComponent } from './components/youtube-iframe/youtube-iframe.component';
import { RoomComponent } from './components/room/room.component';
import { PlaylistComponent } from './components/playlist/playlist.component';
import { ModalComponent } from './components/modal/modal.component';
import { HistoryComponent } from './pages/history/history.component';
import { AboutComponent } from './pages/about/about.component';
import { SettingsComponent } from './pages/settings/settings.component';

const config: SocketIoConfig = { url: environment.serverURL, options: {} };

@NgModule({
  declarations: [
    AppComponent,
    FeedComponent,
    CategoryComponent,
    VideoItemComponent,
    VideoItemEnhancedComponent,
    VideoItemGridComponent,
    VideoItemListComponent,
    ButtonsComponent,
    ShortNumPipe,
    CategoryBadgeComponent,
    PlayerComponent,
    SearchComponent,
    RelatedComponent,
    YoutubeIframeComponent,
    RoomComponent,
    PlaylistComponent,
    ModalComponent,
    HistoryComponent,
    AboutComponent,
    SettingsComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NguCarouselModule,
    SocketIoModule.forRoot(config),
    DragDropModule,
  ],
  providers: [
    ButtonsComponent,
    NguCarouselConfig,
    NguCarousel,
    PlayerComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
