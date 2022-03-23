import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { GlobalsService } from 'src/app/services/globals.service';
import { NotifyService } from 'src/app/services/notify.service';
import { PlaylistControlService } from 'src/app/services/playlist-control.service';
import { RoomService } from 'src/app/services/room.service';
import { SharedService } from 'src/app/services/shared.service';
import { ButtonsComponent } from './buttons/buttons.component';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
})
export class PlayerComponent implements OnInit {
  videoCurRange = 0;
  videoMaxRange = 0;

  timeoutBuffering: any;
  videoRangePercent = 0;
  videoRangeMouseActive = false;
  volumeRangeMouseActive = false;
  videoRangeTimer: any;

  currentMuteState = false;
  isFullscreen = false;

  videoCurVolume = -1;

  videoCurFull = '00:00';
  videoMaxFull = '00:00';

  constructor(
    public globals: GlobalsService,
    public shared: SharedService,
    public playlistCTRL: PlaylistControlService,
    private notify: NotifyService,
    private room: RoomService,
    public playerCTA: ButtonsComponent,
    private socket: Socket
  ) {}

  ngOnInit() {
    // Where app is loaded
    this.shared.preventOldSettings();
    this.shared.getSettings();
    this.room.join();
    this.setDefaultPlayer();

    this.socket.on('event_trigger', (data: any) => {
      switch (data.eventName) {
        case 'playVideo':
          this.playerCTA.triggerPlayPauseVideo();
          break;
        case 'updateState':
          this.changeState({ data: data.playerData.currentState });
          break;
        case 'playNewVideo':
          this.playerCTA.triggerGetVideo(data.playerData.currentVideo);
          break;
        case 'seekTo':
          this.triggerSeekTo(data.playerData.currentSeek);
          break;
        case 'isBuffering':
          // Need a solution when is buffering for one to keep in sync
          // this.globals.player.pauseVideo();
          // this.timeoutBuffering = setTimeout(() => {
          // 	this.globals.player.playVideo();
          // 	clearTimeout(this.timeoutBuffering);
          // }, 500);
          break;
        default:
      }
    });
  }

  changeState(event: any) {
    this.globals.currentState = event.data;

    this.videoMaxRange = this.globals.player.getDuration();
    this.videoCurVolume = this.globals.player.getVolume();

    // https://developers.google.com/youtube/iframe_api_reference#Events
    switch (this.globals.currentState) {
      // Playing
      case 1:
        this.videoMaxFull = this.timeFormat(this.videoMaxRange);
        this.currentMuteState = this.globals.player.isMuted();
        this.startRange();
        break;
      // Paused
      case 2:
        this.stopRange();
        break;
      // Buffering
      case 3:
        this.socket.emit('update_player', {
          eventName: 'isBuffering',
          roomName: this.globals.sessionValue,
          playerData: {
            currentVideo: this.globals.currentVideo,
            currentState: this.globals.currentState,
          },
        });
        break;
      // Ended
      case 0:
        this.stopRange();
        if (this.globals.repeatMode) {
          if (this.globals.playlistVideos.length) {
            this.shared.findPlaylistItem();
            this.playPlaylistItem('next', this.globals.currentPlaylistItem);
            if (this.globals.playlistVideos.length === 1) {
              this.globals.player.playVideo();
            }
          } else {
            this.globals.player.playVideo();
          }
        }
        break;
      default:
    }
  }

  onStateChange(event: any) {
    if (this.globals.isTempSessionActive) {
      this.changeState(event.data);
    } else {
      this.socket.emit('update_player', {
        eventName: 'updateState',
        roomName: this.globals.sessionValue,
        playerData: {
          currentVideo: this.globals.currentVideo,
          currentState: event.data,
        },
      });
    }
  }

  // Init app
  setDefaultPlayer() {
    this.shared
      .initFeed()
      .then((init: any) => {
        if (init) {
          this.globals.loadingState.feed = false;
          this.initCurrentVideo();
        }
      })
      .catch(() => {
        this.globals.loadingState.feed = false;
        this.globals.loadingState.related = false;
        this.globals.loadingState.playlist = false;
        this.globals.loadingState.settings = false;
        this.globals.loadingState.player = false;
      });
    this.shared.setLocalVersion();
  }

  async initCurrentVideo() {
    if (this.globals.playlistVideos.length > 0) {
      await this.shared.getStatsVideos(this.globals.playlistVideos[0].id);
    } else {
      this.globals.currentVideo = this.globals.feedVideos[0];
    }
    this.globals.shareLink =
      'https://youtu.be/' + this.globals.currentVideo['id'];
    this.globals.loadingState.player = false;

    this.shared.findPlaylistItem();
    this.shared.getRelatedVideos();
  }

  // ---------------- Player controls ----------------

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
    if (this.globals.isTempSessionActive) {
      this.triggerSeekTo(value);
    } else {
      this.socket.emit('update_player', {
        eventName: 'seekTo',
        roomName: this.globals.sessionValue,
        playerData: {
          currentVideo: this.globals.currentVideo,
          currentState: this.globals.currentState,
          currentSeek: value,
        },
      });
    }
  }

  triggerSeekTo(value: number) {
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
  }

  volumeRangeMouseMove() {
    if (this.volumeRangeMouseActive) {
      if (this.currentMuteState) {
        this.globals.player.unMute();
        this.currentMuteState = false;
      }
    }
  }

  // TODO
  volumeRangeMouseUp(value: any) {
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

  startRange() {
    this.stopRange();
    if (this.globals.currentState) {
      this.videoRangeTimer = setInterval(() => {
        this.videoCurRange = this.globals.player.getCurrentTime();
        this.videoCurFull = this.timeFormat(this.videoCurRange);
        this.videoRangePercent =
          (this.videoCurRange / this.videoMaxRange) * 100;
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
      this.playerCTA.getVideo(this.globals.playlistVideos[i]);
    } else {
      this.notify.triggerNotify(0);
    }
  }

  timeFormat(time: number) {
    const hours: number = Math.floor(time / 3600);
    const minutes: number = Math.round((time % 3600) / 60);
    const seconds: number = Math.round((time % 3600) % 60);
    const value = `${hours > 0 ? (hours < 10 ? '0' : '') + hours + ':' : ''}${
      (minutes < 10 ? '0' : '') + minutes
    }:${(seconds < 10 ? '0' : '') + seconds}`;
    return value;
  }

  toggleMute() {
    if (this.currentMuteState) {
      this.globals.player.unMute();
      this.currentMuteState = false;
    } else {
      this.globals.player.mute();
      this.currentMuteState = true;
    }
  }

  toggleFullscreen() {
    this.isFullscreen = !this.isFullscreen;
  }
}
