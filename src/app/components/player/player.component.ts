import { Component, OnInit } from '@angular/core';
import { PlaylistControlService } from '../../services/playlist-control.service';
import { GlobalsService } from '../../services/globals.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-component-player',
  templateUrl: './player.component.html',
})
export class PlayerComponent implements OnInit {

  videoCurRange = 0;
  videoMaxRange = 0;

  videoRangePercent = 0;
  videoRangeMouseActive = false;
  volumeRangeMouseActive = false;
  videoRangeTimer: any;

  currentMuteState = false;
  isFullscreen = false;

  videoCurVolume = -1;

  videoCurFull = '00:00:00';
  videoMaxFull = '00:00:00';

  loading = true;

  constructor(
    public globals: GlobalsService,
    public shared: SharedService,
    public playlistCTRL: PlaylistControlService,
  ) {
  }

  ngOnInit() {
    this.shared.getSettings();
    this.setDefaultPlayer();
  }

  savePlayer(player) {
    this.globals.player = player;
  }

  playerVars() {
    const playerVars = {
      'enablejsapi': 1,
      'playsinline': 1,
      'autoplay': 0,
      'loop': 0,
      'modestbranding': 1,
      'rel': 0
    };
    return playerVars;
  }

  onStateChange(event: any) {
    this.globals.currentState = event.data;
    this.videoMaxRange = this.globals.player.getDuration();
    this.videoCurVolume = this.globals.player.getVolume();

    if (this.globals.currentState === 1) {
      this.videoMaxFull = this.timeFormat(this.videoMaxRange);
      this.currentMuteState = this.globals.player.isMuted();
      this.startRange();
    } else {
      this.stopRange();
    }

    if (this.globals.currentState === 0) {
      this.stopRange();
      if (this.globals.repeatMode) {
        if (this.globals.playlistVideos.length) {
          this.shared.findPlaylistItem();
          if (this.globals.currentPlaylistItem < 0) {
            this.playPlaylistItem('next', this.globals.currentPlaylistItem);
          } else {
            this.playPlaylistItem('next', this.globals.currentPlaylistItem);
          }
          if (this.globals.playlistVideos.length === 1) {
            this.globals.player.playVideo();
          }
        } else {
          this.globals.player.playVideo();
        }
      }
    }
  }

  // Init player

  setDefaultPlayer() {
    this.shared.initFeed().then(() => {
      this.initPlayer();
      this.playlistCTRL.fillPlaylist();
      this.loading = false;
    });
  }

  initPlayer() {
    this.globals.currentVideo = this.globals.feedVideos[0];
    this.globals.shareLink = 'https://youtu.be/' + this.globals.currentVideo['id'];
  }

  // ---------------- Player controls ----------------

  playPauseVideo() {
    if (this.globals.currentState === 1) {
      this.globals.player.pauseVideo();
    } else {
      this.globals.player.playVideo();
    }
  }

  rangeNouseDown() {
    this.videoRangeMouseActive = true;
    this.stopRange();
  }

  rangeMouseMove(value: number) {
      if (this.videoRangeMouseActive) {
        this.videoCurRange = value;
        this.videoRangePercent = (this.videoCurRange / this.videoMaxRange) * 100;
        this.videoCurFull = this.timeFormat(this.videoCurRange);
      }
  }

  rangeMouseUp(value: number) {
    if (this.globals.currentState !== -1 && this.globals.currentState !== 1) {
      this.globals.player.playVideo();
    }
    if (this.globals.currentState === 1) {
      this.startRange();
    } else {
      this.stopRange();
    }

    this.videoCurRange = value;
    this.videoRangePercent = (this.videoCurRange / this.videoMaxRange) * 100;
    this.videoCurFull = this.timeFormat(this.videoCurRange);

    this.globals.player.seekTo(this.videoCurRange, true);
    this.videoRangeMouseActive = false;
    // this.dbcrud.update('sessions', 'currentSeek', this.videoCurRange);
  }

  volumeRangeMouseMove(value: number) {
    if (this.volumeRangeMouseActive) {
      if (this.currentMuteState) {
        this.globals.player.unMute();
        this.currentMuteState = false;
      }
    }
  }

  volumeRangeMouseUp(value: number) {
    if (this.currentMuteState) {
      this.globals.player.unMute();
      this.currentMuteState = false;
    }
    this.globals.player.setVolume(value);
  }

  checkVolumeRange() {
    if (this.globals.currentState !== -1) {
      this.currentMuteState = this.globals.player.isMuted();
      this.videoCurVolume = this.globals.player.getVolume();
    }
  }


  getVideo(data: any) {
    this.shared.getStatsVideos(data.id).then(() => {
      this.playVideo(data);
      this.shared.getRelatedVideos();
    });
  }

  playVideo(data: any) {
    this.shared.addHistoryVideo(data);
    this.globals.player.loadVideoById(data.id);
    this.playlistCTRL.fillPlaylist();
    this.shared.findPlaylistItem();
  }

  startRange() {
    this.stopRange();
    if (this.globals.currentState) {
      this.videoRangeTimer = setInterval(() => {
        this.videoCurRange = this.globals.player.getCurrentTime();
        this.videoCurFull = this.timeFormat(this.videoCurRange);
        this.videoRangePercent = (this.videoCurRange / this.videoMaxRange) * 100;
      }, 1000);
    }
  }

  stopRange() {
     clearInterval(this.videoRangeTimer);
  }

  playPlaylistItem(direction: string, i: number) {
    if (direction === 'next') {
      if (i < this.globals.playlistVideos.length) {
        i += 1;
      }
      if (i === this.globals.playlistVideos.length) {
        i = 0;
      }
    }
    if (direction === 'prev') {
      if (i === 0 || i < 0) {
        i = this.globals.playlistVideos.length - 1;
      } else {
        i -= 1;
      }
    }
    if (this.globals.playlistVideos.length > 0) {
      this.getVideo(this.globals.playlistVideos[i]);
    } else {
      this.shared.triggerNotify('Playlist is empty');
    }
  }

  // Others
  onClickRelated(i: number) {
    this.getVideo(this.globals.relatedVideos[i]);
  }

  timeFormat(time: number) {
    const hours: any = Math.floor(time / 3600);
    const minutes: any = Math.floor(time % 3600 / 60);
    const seconds: any = Math.floor(time % 3600 % 60);
    const value = (parseInt(hours, 10) < 10 ? '0' : '' ) + parseInt(hours, 10) + ':'
              + (parseInt(minutes, 10) < 10 ? '0' : '' ) + parseInt(minutes, 10) + ':'
              + (parseInt(seconds, 10) < 10 ? '0' : '' ) + parseInt(seconds, 10);
    return value;
  }


  toggleHeadSettings(int: number) {
    if (int === 2) {
      if (this.currentMuteState) {
        this.globals.player.unMute();
        this.currentMuteState = false;
      } else {
        this.globals.player.mute();
        this.currentMuteState = true;
      }
    }
  }

  toggleFullscreen() {
    this.isFullscreen = !this.isFullscreen;
  }
}
