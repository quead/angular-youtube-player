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
        this.globals.isLoading = false;
      });
    } else {
      this.shared.getRelatedVideos();
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

  addPlaylistItem(i: number, list: number) {
    let listType;
    if (list === 0) {
      listType = this.globals.feedVideos[i];
    }
    if (list === 1) {
      listType = this.globals.lastSearchedVideos[i];
    }
    if (list === 2) {
      listType = this.globals.relatedVideos[i];
    }
    if (list === 3) {
      listType = this.globals.currentVideo;
    }
    if (list === 4) {
      listType = this.globals.historyVideos[i];
    }

    const playlistItem = this.globals.playlistVideos.find(item => item.id === listType.id);

    if (typeof playlistItem === 'undefined') {
      this.globals.playlistVideos.push(listType);
      this.shared.checkPlaylist();

      this.shared.triggerNotify('Added to playlist');
      this.scrollToBottom();
    } else {
      this.shared.triggerNotify('Video is already in playlist');
    }
  }

  scrollToBottom() {
    try {
      setTimeout( () => {
        this.globals.myScrollContainer.nativeElement.scrollTop = this.globals.myScrollContainer.nativeElement.scrollHeight;
      }, 200);
    } catch (err) {
      console.log(err);
      console.log('scroll issue');
    }
  }

}
