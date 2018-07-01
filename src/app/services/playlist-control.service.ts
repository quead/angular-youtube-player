import { Injectable } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { GlobalsService } from '../services/globals.service';

@Injectable()
export class PlaylistControlService {

  playlistPrefill = true;

  constructor(
    public shared: SharedService,
    public globals: GlobalsService,
  ) { }

  fillPlaylist() {
    if (this.playlistPrefill) {
      this.shared.getRelatedVideos().then(() => {
        this.playlistInit();
        this.playlistPrefill = false;
      });
    }
  }

  playlistInit() {
    if (localStorage.getItem('playlist') === null || localStorage.getItem('playlist').length === 0 || localStorage.getItem('playlist').length === 2) {
      this.globals.playlistVideos = this.globals.relatedVideos;
      this.shared.updatePlaylist();
    } else {
      this.shared.getPlaylist();
    }
    this.shared.findPlaylistItem();
  }

}
