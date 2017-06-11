import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { YoutubeGetVideo } from '../config/youtube.config';
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
  currentMuteState: boolean = true;

  _ref: any;

  videoRangeTimer: any;
  videoCurRange: number = 0;
  videoMaxRange: number = 0;

  videoCurFull: string = '00:00:00';
  videoMaxFull: string = '00:00:00';

  videoCurVolume: number = -1;
  
  constructor(private youtube: YoutubeGetVideo, ref: ChangeDetectorRef) {
    this._ref = ref;
  }
 
  ngOnInit() {    
    this.searchFunction();
  }

  searchFunction() {
    this.searchForm = new FormGroup({
      searchInput: new FormControl('', [Validators.required, Validators.minLength(2)])
    });

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
            console.log('error on search');
          }
        );
    })
  }

  playerVars() {
    let playerVars = {
      'controls': 0,
      'disablekb': 1,
      'rel': 0
    }
    return playerVars;
  }
  
  changeStates(event) {
    //Trigger from youtube-settings.component
    console.log(event);
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

  toggleMute() {
    if(this.currentMuteState) {
      this.player.unMute();
      this.currentMuteState = false;
    } else {
      this.player.mute();
      this.currentMuteState = true;
    }
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
      this.currentMuteState = this.player.isMuted(); 
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
    if (this.currentMuteState) {
      this.player.unMute();
      this.currentMuteState = false;
    }
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