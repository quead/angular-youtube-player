import { Component, OnInit } from '@angular/core';
import { PlayerComponent } from '../components/player/player.component';
import { SharedService } from '../services/shared.service';
import { PlaylistComponent } from '../components/playlist/playlist.component';
import { GlobalsService } from '../services/globals.service';

@Component({
  selector: 'app-history',
  templateUrl: 'youtube-history.component.html'
})

export class HistoryComponent implements OnInit {

  constructor(
    public globals: GlobalsService,
    private playerComp: PlayerComponent,
    public shared: SharedService,
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
    this.shared.onCopyVideoItemLink(i, list);
  }

  onClickHistory(i: number) {
    this.playerComp.getVideo(this.globals.historyVideos[i]);
  }

}
