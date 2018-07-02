import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { PlaylistComponent } from '../components/playlist/playlist.component';
import { GlobalsService } from '../services/globals.service';

@Component({
  selector: 'app-history',
  templateUrl: 'youtube-history.component.html'
})

export class HistoryComponent implements OnInit {

  constructor(
    public globals: GlobalsService,
    private app: AppComponent,
    private playlist: PlaylistComponent
  ) {
  }

  ngOnInit() {
    console.log('history');
  }

  addPlaylistItem(i: number, list: number) {
      this.playlist.addPlaylistItem(i, list);
  }

  onCopyVideoItemLink(i: number, list: number) {
    this.app.onCopyVideoItemLink(i, list);
  }

  onClickHistory(event: Event, i: number) {
    this.app.playerComp.getVideo(this.globals.historyVideos[i]);
  }

}
