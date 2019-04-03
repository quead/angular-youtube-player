import { Component, OnInit, Input } from '@angular/core';
import { GlobalsService } from '../../../services/globals.service';
import { SharedService } from '../../../services/shared.service';
import { PlaylistControlService } from '../../../services/playlist-control.service';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
})
export class ButtonsComponent implements OnInit {
  @Input('listID') listID: number;
  @Input('videoIndex') videoIndex: number;

  constructor(
    public globals: GlobalsService,
    public shared: SharedService,
    private playlistCTRL: PlaylistControlService,
    private socket: Socket
  ) {
  }

  ngOnInit() {
  }

  getVideoFromList(i: number, listIndex: number) {
    let videoSelected;

    switch(listIndex) {
      case 0:
        videoSelected = this.globals.feedVideos[i];
      break;
      case 1:
        videoSelected = this.globals.searchedVideos[i];
      break;
      case 2:
        videoSelected = this.globals.relatedVideos[i];
      break;
      case 3:
        videoSelected = this.globals.playlistVideos[i];
      break;
      case 4:
        videoSelected = this.globals.historyVideos[i];
      default:
    }

    return videoSelected;
  }

  triggerPlayPauseVideo() {
    if (this.globals.currentState === 1) {
      this.globals.player.pauseVideo();
    } else {
      this.globals.player.playVideo();
    }
  }

  playPauseVideo() {
    if (this.globals.isTempSessionActive) {
      this.triggerPlayPauseVideo();
    } else {
      this.socket.emit('update_player', {
        eventName: 'playVideo',
        roomName: this.globals.sessionValue,
        playerData: {
          currentVideo: this.globals.currentVideo,
          currentState: this.globals.currentState,
        }
      });
    }
  }

  onClickVideo(i: number, list: number) {
    if (this.globals.currentVideo.id === this.getVideoFromList(i, list).id) {
      this.playPauseVideo();
    } else {
      this.getVideo(this.getVideoFromList(i, list));
    }
}

getVideo(data: any) {
  if (this.globals.isTempSessionActive) {
    this.triggerGetVideo(data);
  } else {
    this.socket.emit('update_player', {
      eventName: 'playNewVideo',
      roomName: this.globals.sessionValue,
      playerData: {
        currentVideo: data,
        currentState: this.globals.currentState
      }
    });
  }
}

triggerGetVideo(data: any) {
  this.shared.getStatsVideos(data.id).then(() => {
    this.playVideo(data);
    this.shared.getRelatedVideos();
  });
}

playVideo(data: any) {
  this.shared.addHistoryVideo(data);
  this.globals.player.loadVideoById(data.id);
  this.shared.findPlaylistItem();
}

}
