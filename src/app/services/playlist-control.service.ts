import { Injectable } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { GlobalsService } from '../services/globals.service';
import { NotifyService } from '../services/notify.service';

@Injectable()
export class PlaylistControlService {

  constructor(
    public shared: SharedService,
    public globals: GlobalsService,
    private notify: NotifyService
  ) { }

  fillPlaylist() {
    this.shared.getRelatedVideos().then(() => {
      this.shared.downloadPlaylist();
      this.globals.isLoading = false;
    });
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

      this.notify.triggerNotify(3);
      this.scrollToBottom();
    } else {
      this.notify.triggerNotify(4);
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
