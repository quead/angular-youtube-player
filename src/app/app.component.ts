import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { YoutubeGetVideo } from './config/youtube.config';
import { SharedService } from './config/shared.module';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-yt',
  templateUrl: 'app.component.html'
})

export class AppComponent implements OnInit {

  searchForm: FormGroup;

  relatedVideos: Array<any>;
  feedVideos: Array<any>;
  historyVideos: Array<any> = [];

  debuggingInfo = false;
  displayVideoPlayer = true;
  repeatMode = true;
  regionCode: string;

  player: YT.Player;
  currentVideoID: string;
  currentVideoName: string;
  currentState = -1;
  currentMuteState = true;

  _ref: any;
  _shared: any;

  videoRangeTimer: any;
  videoCurRange = 0;
  videoMaxRange = 0;

  videoCurFull = '00:00:00';
  videoMaxFull = '00:00:00';

  videoCurVolume = -1;

  loading = true;

  constructor(
    private youtube: YoutubeGetVideo,
    private ref: ChangeDetectorRef,
    private shared: SharedService
  ) {
    this._ref = ref;
    this._shared = shared;
  }

  ngOnInit() {
      console.log('app comp');
      this.getSettings();
      this.getFeedVideos();
  }

  addHistoryVideo(data: any) {
      let key;
      for (key in this.historyVideos) {
        if (this.historyVideos[key].id === data.id) {
            this.historyVideos.splice(key, 1);
            if (this.historyVideos[this.historyVideos.length - 1] === data) {
              this.historyVideos.splice(-1, 1);
            }
        }
      }
      this.historyVideos.unshift(data);
  }

  onClickRelated(event: Event, i: number) {
    this.getVideo(this.relatedVideos[i]);
  }

  onClickHistory(event: Event, i: number) {
    this.playVideo(this.historyVideos[i]);
  }

  getVideo(data: any) {
    const tempData = {
      id: '',
      title: '',
      thumbnail: ''
    };
    if (data.id.videoId) {
      tempData.id = data.id.videoId;
    } else if (data.id) {
      tempData.id = data.id;
    }
    tempData.title = data.snippet.title;
    tempData.thumbnail = data.snippet.thumbnails.medium.url;
    this.playVideo(tempData);
  }

  playVideo(data: any) {
    if (data.id !== this.currentVideoID || this.currentState === -1) {
      this.currentVideoID = data.id;
      this.currentVideoName = data.title;
      this.historyVideos.push(data);
      this.addHistoryVideo(data);
      this.player.loadVideoById(this.currentVideoID);
      this.getRelatedVideos();
    }
  }

  playerVars() {
    const playerVars = {
      'enablejsapi': 1,
      'controls': 0,
      'disablekb': 0,
      'showinfo': 0,
      'playsinline': 1,
      'rel': 0
    };
    return playerVars;
  }

  getSettings() {
    this._shared.getSettings().subscribe(data => {
        this.debuggingInfo = data.form_settings[0].value;
        this.regionCode = data.api_settings[1].value;
    });
  }

  getFeedVideos() {
    this._shared.getFeed().subscribe(data => {
      this.feedVideos = data;
      if (typeof this.currentVideoID === 'undefined') {
        this.setDefaultPlayer();
      }
      this.getStatsVideos(this.currentVideoID);
    });
  }

  getStatsVideos(query: string) {
    this.youtube.statsVideos(query).subscribe(
        result => {
          console.log(result);
        },
        error => {
          console.log('error on related videos');
        }
    );
  }

  getRelatedVideos() {
    this.youtube.relatedVideos(this.currentVideoID).subscribe(
        result => {
          this.relatedVideos = result.items;
        },
        error => {
          console.log('error on related videos');
        }
      );
  }

  setDefaultPlayer() {
      this.feedVideos = this._shared.feedVideos;
      this.currentVideoID = this.feedVideos[0].id;
      this.currentVideoName = this.feedVideos[0].snippet.title;
      this.getRelatedVideos();
  }

  setSettings(data: any, from: number) {
    if (from === 0) {
      this.debuggingInfo = data[from].value;
    }
  }

  toggleHeadSettings(int: number) {
    if (int === 0) {
      if (this.displayVideoPlayer) {
        this.displayVideoPlayer = false;
      } else {
        this.displayVideoPlayer = true;
      }
    }
    if (int === 1) {
      if (this.repeatMode) {
        this.repeatMode = false;
      } else {
        this.repeatMode = true;
      }
    }
    if (int === 2) {
      if (this.currentMuteState) {
        this.player.unMute();
        this.currentMuteState = false;
      } else {
        this.player.mute();
        this.currentMuteState = true;
      }
    }
  }

  savePlayer(player) {
    this.player = player;
  }

  onStateChange(event) {
    this.currentState = event.data;
    this.videoMaxRange = this.player.getDuration();

    if (this.currentState === 1) {
      this.videoMaxFull = this.timeFormat(this.videoMaxRange);
      this.videoCurVolume = this.player.getVolume();
      this.currentMuteState = this.player.isMuted();
      this.startRange();
    }

    if (this.currentState === 0) {
      this.stopRange();
      if (this.repeatMode) {
        this.player.playVideo();
      }
    }
  }

  playPauseVideo() {
    if (this.currentState === 1) {
      this.player.pauseVideo();
    } else {
      this.player.playVideo();
    }
  }

  startRange() {
    this.stopRange();
    this.videoRangeTimer = setInterval(() => {
      this.videoCurRange = this.player.getCurrentTime();
      this.videoCurFull = this.timeFormat(this.videoCurRange);
      this._ref.markForCheck();
    }, 1000);
  }

  stopRange() {
     clearTimeout(this.videoRangeTimer);
  }


  RangeNouseDown(event: Event) {
    if (event['buttons'] === 1) {
      this.stopRange();
    }
  }

  RangeMouseUp(value: number) {
    this.player.seekTo(value, true);
    this.videoCurRange = value;
    this.startRange();
  }

  volumeRangeMouseUp(value: number) {
    if (this.currentMuteState) {
      this.player.unMute();
      this.currentMuteState = false;
    }
    this.player.setVolume(value);
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

}
