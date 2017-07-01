import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { YoutubeGetVideo } from './config/youtube.config';
import { AboutComponent } from './components/youtube-about.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, Event as RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-yt',
  templateUrl: 'app.component.html'
})

export class AppComponent implements OnInit {

  searchForm: FormGroup;

  relatedVideos = false;
  feedVideos = false;

  debuggingInfo = false;

  player: YT.Player;
  currentVideoID: string;
  currentVideoName: string;
  currentVideoImage: string;
  currentState = -1;
  currentMuteState = true;

  _ref: any;
  _set: any;

  videoRangeTimer: any;
  videoCurRange = 0;
  videoMaxRange = 0;

  videoCurFull = '00:00:00';
  videoMaxFull = '00:00:00';

  videoCurVolume = -1;

  loading: boolean = true;

  constructor(private youtube: YoutubeGetVideo, private ref: ChangeDetectorRef, private router: Router) {
    this._ref = ref;
    router.events.subscribe((event: RouterEvent) => {
        this.navigationInterceptor(event);
    });
  }

  ngOnInit() {
    console.log(AboutComponent);
  }

  navigationInterceptor(event: RouterEvent) {
        if (event instanceof NavigationStart) {
            this.loading = true;
        }
        if (event instanceof NavigationEnd) {
            this.loading = false;
        }

        // Set loading state to false in both of the below events to hide the spinner in case a request fails
        if (event instanceof NavigationCancel) {
            this.loading = false;
        }
        if (event instanceof NavigationError) {
            this.loading = false;
        }
  }

  onClickRelated(event: Event, i: number) {
    const videoID = this.relatedVideos[i].id.videoId;
    const videoName = this.relatedVideos[i].snippet.title;
    this.getVideo(videoID, videoName);
  }

  getVideo(videoID: string, videoName: string) {
    this.currentVideoID = videoID;
    this.currentVideoName = videoName;
    this.player.loadVideoById(videoID);
    this.getRelatedVideos();
  }

  playerVars() {
    const playerVars = {
      'controls': 0,
      'disablekb': 1,
      'rel': 0
    };
    return playerVars;
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

  setDefaultPlayer(data: any) {
      if (this.currentState < 0) {
        this.feedVideos = data;
        this.currentVideoID = this.feedVideos[0].id;
        this.currentVideoName = this.feedVideos[0].snippet.title;
        this.getRelatedVideos();
      }
  }
  
  setSettings(data: any, from: number) {
    if(from === 1) {
      console.log(data);
    }
  }

  toggleMute() {
    if (this.currentMuteState) {
      this.player.unMute();
      this.currentMuteState = false;
    } else {
      this.player.mute();
      this.currentMuteState = true;
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
    }
  }

  playPauseVideo() {
    if (this.currentState === 0 || this.currentState === 2 || this.currentState === -1 ) {
      this.player.playVideo();
    }
    if (this.currentState === 1) {
      this.player.pauseVideo();
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
