import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { YoutubeGetVideo } from '../config/youtube.config';
import { SettingsComponent } from './youtube-settings.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import 'rxjs/add/operator/map';

@Component({
  selector: 'yt-search',
  templateUrl: 'youtube-search.component.html',
})

export class SearchComponent {

  @Input() set showStates(event: string){
        this.changeStates(event);
  }

  searchForm: FormGroup;

  videos: any;
  
  relatedVideos: boolean = false;
  debuggingInfo: boolean = true;

  player: YT.Player;
  currentVideoID: string = 'Not Exist';
  currentVideoName: string;
  currentState: number;

  _ref: any;
  _settings: any;

  videoRangeTimer: any;
  videoCurRange: number = 0;
  videoMaxRange: number = 0;

  videoCurFull: string = '00:00:00';
  videoMaxFull: string = '00:00:00';

  videoCurVolume: number = -1;
  
  constructor(private youtube: YoutubeGetVideo, private settings: SettingsComponent, ref: ChangeDetectorRef) {
    this._settings = settings;
    this._ref = ref;
  }
 
  ngOnInit() {    
    this.searchForm = new FormGroup({
      searchInput: new FormControl('', [Validators.required, Validators.minLength(2)])
    });

    if(this._settings.getSettings.value[0]) {
      this.changeStates(1);
    } else {
      this.changeStates(0);
    }
    
    this.searchForm.valueChanges.subscribe((form) => {
        this.youtube.searchVideo(form.searchInput).subscribe(
          result => {
            if(!this.searchForm.invalid) {
              this.videos = result.items;    
            } else {
              this.videos = null;
            }
          },
          error => {
            console.log('error');
          }
        );
    })
    
  }

  
  changeStates(event) {
    console.log(event);
    if(event === 1) {
      this.debuggingInfo = true;
    } else {
      this.debuggingInfo = false;
    }
  }

  getRelatedVideos() {
      this.youtube.relatedVideos(this.currentVideoID).subscribe(
          result => {
            this.relatedVideos = result.items;
          },
          error => {
            console.log('error');
          }
        );
  }

  clearSearch() {
    this.searchForm.reset();
    this.videos = null;
  }

  onSubmit(event: Event) {
    event.preventDefault();
  }

  onClickVideo(event: Event, i: any) {
    let clickedVideo = this.videos[i];
    this.currentVideoID = clickedVideo.id.videoId;
    this.currentVideoName = clickedVideo.snippet.title;
    this.player.loadVideoById(this.currentVideoID);
    this.getRelatedVideos();
    this.clearSearch();
  }
  
  onClickRelatedVideo(event: Event, i: any) {
    let clickedVideo = this.relatedVideos[i];
    this.currentVideoID = clickedVideo.id.videoId;
    this.currentVideoName = clickedVideo.snippet.title;
    this.player.loadVideoById(this.currentVideoID);
    this.getRelatedVideos();
  }

  savePlayer (player) {
    this.player = player;
  }
  
  onStateChange(event){
    this.currentState = event.data;
    this.videoMaxRange = this.player.getDuration();
    if(this.currentState === 1) {
      this.videoMaxFull = this.timeFormat(this.videoMaxRange);
      this.videoCurVolume = this.player.getVolume();
      this.startRange();
    }
    if(this.currentState === 0) {
      this.stopRange();
    }
  }

  playPauseVideo() {
    if(this.currentState === 0) {
      this.player.playVideo();
    }
    if(this.currentState === 1) {
      this.player.pauseVideo();
    }
    if(this.currentState === 2) {
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
    if(event['buttons'] === 1) {
      this.stopRange();
    }
  }

  RangeMouseUp(value: number) {
    this.player.seekTo(value, true);
    this.videoCurRange = value;
    this.startRange();
  }

  volumeRangeMouseUp(value: number) {
    this.player.setVolume(value);
  }

  timeFormat(time: number) {
    let hours: any = Math.floor(time / 3600);
    let minutes: any = Math.floor(time % 3600 / 60);
    let seconds: any = Math.floor(time % 3600 % 60);
    let value = (parseInt(hours) < 10 ? '0' : '' ) + parseInt(hours) + ':' + (parseInt(minutes) < 10 ? '0' : '' ) + parseInt(minutes) + ':' + (parseInt(seconds) < 10 ? '0' : '' ) + parseInt(seconds);
    return value;
  }
  
}