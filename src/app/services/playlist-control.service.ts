import { Injectable } from '@angular/core';
import { VideoModel } from '../models/video.model';
import { GlobalsService } from './globals.service';
import { NotifyService } from './notify.service';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root',
})
export class PlaylistControlService {
  constructor(
    public shared: SharedService,
    public globals: GlobalsService,
    private notify: NotifyService
  ) {}

  addPlaylistItem(i: number, list: number) {
    // TODO
    let listType: any;
    if (list === 0) {
      listType = this.globals.feedVideos[i];
    }
    if (list === 1) {
      listType = this.globals.searchedVideos[i];
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

    const playlistItem = this.globals.playlistVideos.find(
      (item) => item.id === listType.id
    );

    if (typeof playlistItem === 'undefined') {
      this.globals.playlistVideos.push(listType);
      this.shared.checkPlaylist();

      this.notify.triggerNotify(3);
      this.scrollToBottom();
    } else {
      this.notify.triggerNotify(4);
    }
  }

  removePlaylistItem(i: number) {
    this.notify.triggerNotify(23);
    setTimeout(() => {
      if (i === this.globals.currentPlaylistItem) {
        this.globals.currentPlaylistItem = -1;
      }
      this.globals.playlistVideos.splice(i, 1);
      this.shared.checkPlaylist();
    }, 200);
  }

  scrollToBottom() {
    try {
      setTimeout(() => {
        this.globals.myScrollContainer.nativeElement.scrollTop =
          this.globals.myScrollContainer.nativeElement.scrollHeight;
      }, 200);
    } catch (err) {
      console.log(err);
      console.log('scroll issue');
    }
  }
}
