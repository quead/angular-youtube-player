import { Component, ElementRef, ViewChild, OnInit, HostListener } from '@angular/core';
import { YoutubeGetVideo } from './shared/youtube.service';
import { SharedService } from './shared/lists.service';
import { Event } from '@angular/router/src/events';
import { DragulaService } from 'ng2-dragula/ng2-dragula';

// DB
import { DbCrudService } from './services/db-crud.service';
import { AuthService } from './services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';

import { IRelatedVideo } from './models/related-video.model';
import { INotify } from './models/notify.model';
import { IFeedVideo } from './models/feed-video.model';

@Component({
  selector: 'app-yt',
  templateUrl: 'app.component.html',
  providers: [ AuthService, DbCrudService ]
})

export class AppComponent implements OnInit {
  @ViewChild('playlistContainer') private myScrollContainer: ElementRef;
  @ViewChild('videoItemIDvalue') private videoItemIDvalue: ElementRef;

  notify: INotify;
  nw: any;
  videoRangePercent = 0;

  relatedVideos: Array<IRelatedVideo>;
  feedVideos: Array<IFeedVideo>;
  playlistVideos: Array<any> = [];
  tempPlaylist: Array<any> = [];
  currentVideoObject: Array<any> = [];

  thumbnails = true;
  darkMode = true;
  menuActive = false;

  modal = false;
  modalPlaylist = false;
  modalExportPlaylist = false;
  modalPlaylistItem: number;

  playlistPrefill = true;
  currentPlaylistItem: number;
  displayVideoPlayer = true;
  repeatMode = true;
  regionCode: string;
  shareLink = '';

  player: YT.Player;

  currentVideo = {
      id: '',
      title: '',
      channelTitle: '',
      stats: {
        likes: '',
        dislikes: '',
        views: ''
      }
  };

  currentState = -1;
  currentMuteState = false;

  videoRangeMouseActive = false;
  volumeRangeMouseActive = false;
  videoRangeTimer: any;
  videoCurRange = 0;
  videoMaxRange = 0;

  videoCurFull = '00:00:00';
  videoMaxFull = '00:00:00';

  videoCurVolume = -1;

  _shared: any;

  loading = true;

  importPlaylistInput: any;

  constructor(
    private youtube: YoutubeGetVideo,
    private shared: SharedService,
    private dragula: DragulaService,

    private authService: AuthService,
    public afAuth: AngularFireAuth,
    private db2: AngularFireDatabase,
    private dbcrud: DbCrudService
  ) {
    this._shared = shared;
    this.notify = this._shared.notify;
    this.initDragula();
  }

  ngOnInit() {
      this.preventOldSettings();
      this.updateUserDetails();
  }

  private hasClass(el: any, name: string) {
    return new RegExp('(?:^|\\s+)' + name + '(?:\\s+|$)').test(el.className);
  }

  private addClass(el: any, name: string) {
    if (!this.hasClass(el, name)) {
      el.className = el.className ? [el.className, name].join(' ') : name;
    }
  }

  private removeClass(el: any, name: string) {
    if (this.hasClass(el, name)) {
      el.className = el.className.replace(new RegExp('(?:^|\\s+)' + name + '(?:\\s+|$)', 'g'), '');
    }
  }

  // ---------------- User ------------------

  loginGoogle() {
    this.authService.login(this.currentVideo);
  }

  logout() {
    this.authService.logout();
  }

  updateUserDetails() {
    // To fix update in realtime
    this.authService.checkLogged();
    this.db2.list('sessions/' + localStorage.getItem('session_key')).valueChanges().subscribe((data) => {
      if (data.length > 0) {
        this.currentVideo = data['2'];
        this.shareLink = 'https://youtu.be/' + this.currentVideo.id;
        this.getRelatedVideos();    
      } else {
        this.setDefaultPlayer();
      }
    });
    this.setSettings();
  }

  // ---------------- Init player ----------------

  savePlayer(player) {
      this.player = player;
  }

  playerVars() {
    const playerVars = {
      'enablejsapi': 1,
      'controls': 1,
      'disablekb': 0,
      'showinfo': 0,
      'playsinline': 1,
      'autoplay': 0,
      'loop': 0,
      'origin': 'http://google.com',
      'rel': 0
    };
    return playerVars;
  }

  async getFeedVideos() {
    await this._shared.initFeed();
    await this._shared.initChannel();
    this.feedVideos = this._shared.feedVideos;
    if (!this.currentVideo.id && !this._shared.isLogged) {
      this.setDefaultPlayer();
    }
  }

  async getChannel() {
    await this._shared.initChannel();
  }

  setCurrentVideoObject(data: any) {
    this.currentVideoObject = [];
    this.currentVideoObject.push(data);
  }

  setDefaultPlayer() {
      this.feedVideos = this._shared.feedVideos;
      this.setCurrentVideoObject(this.feedVideos[0]);
      this.currentVideo.id = this.feedVideos[0].id;
      this.currentVideo.title = this.feedVideos[0].snippet.title;
      this.currentVideo.stats.likes = this.feedVideos[0].statistics.likeCount;
      this.currentVideo.stats.dislikes = this.feedVideos[0].statistics.dislikeCount;
      this.currentVideo.stats.views = this.feedVideos[0].statistics.viewCount;
      this.shareLink = 'https://youtu.be/' + this.currentVideo.id;
      this.getRelatedVideos();
      this.findPlaylistItem();
  }

  onStateChange(event: any) {
    this.currentState = event.data;
    this.videoMaxRange = this.player.getDuration();
    this.videoCurVolume = this.player.getVolume();

    if (this.currentState === 1) {
      this.videoMaxFull = this.timeFormat(this.videoMaxRange);
      this.currentMuteState = this.player.isMuted();
      this.startRange();
    } else {
      this.stopRange();
    }

    if (this.currentState === 0) {
      this.stopRange();
      if (this.repeatMode) {
        if (this.playlistVideos.length) {
          this.findPlaylistItem();
          if (this.currentPlaylistItem < 0) {
            this.playPlaylistItem('next', this.currentPlaylistItem);
          } else {
            this.playPlaylistItem('next', this.currentPlaylistItem);
          }
          if (this.playlistVideos.length === 1) {
            this.player.playVideo();
          }
        } else {
          this.player.playVideo();
        }
      }
    }
  }

  startRange() {
    this.stopRange();
    if (this.currentState) {
      this.videoRangeTimer = setInterval(() => {
        this.videoCurRange = this.player.getCurrentTime();
        this.videoCurFull = this.timeFormat(this.videoCurRange);
        this.videoRangePercent = (this.videoCurRange / this.videoMaxRange) * 100;
      }, 1000);
    }
  }

  stopRange() {
     clearInterval(this.videoRangeTimer);
  }

  // ---------------- Playlist settings ----------------

  updatePlaylist() {
    this.findPlaylistItem();
    this._shared.playlist = this.playlistVideos;
    this._shared.updatePlaylist();
  }

  uploadPlaylist(event: Event) {
    const files = event['target'].files[0];
    if (files.length <= 0) {
      return false;
    }

    const fr = new FileReader();
    fr.onload = (e) => {
      this.tempPlaylist = JSON.parse(e.target['result']);
    };

    fr.readAsText(files);
  }

  playlistInit() {
      if (localStorage.getItem('playlist') === null || localStorage.getItem('playlist').length === 2) {
        this.playlistVideos = JSON.parse(JSON.stringify(this.relatedVideos));
        this._shared.playlist = JSON.parse(JSON.stringify(this.playlistVideos));
        this._shared.updatePlaylist();
      } else {
        this._shared.getPlaylist();
        this.playlistVideos = JSON.parse(JSON.stringify(this._shared.playlist));
      }
      this.findPlaylistItem();
  }

  findPlaylistItem() {
      let playlistItem;
      if (!this._shared.isLogged) {
        if (typeof this.currentVideoObject[0].id.videoId !== 'undefined') {
          playlistItem = this.playlistVideos.find(item => item.id.videoId === this.currentVideoObject[0].id.videoId);
        } else {
          playlistItem = this.playlistVideos.find(item => item.id === this.currentVideoObject[0].id);
        }
      }
      this.currentPlaylistItem = this.playlistVideos.indexOf(playlistItem);
  }

  playPlaylistItem(direction: string, i: number) {
    if (direction === 'next') {
      if (i < this.playlistVideos.length) {
        i += 1;
      }
      if (i === this.playlistVideos.length) {
        i = 0;
      }
    }
    if (direction === 'prev') {
      if (i === 0 || i < 0) {
        i = this.playlistVideos.length - 1;
      } else {
        i -= 1;
      }
    }
    if (this.playlistVideos.length > 0) {
      this.getVideo(this.playlistVideos[i]);
    } else {
      this._shared.triggerNotify('Playlist is empty');
      this.updateNotify();
    }
  }

  removePlaylistItem(i: number) {
      this._shared.triggerNotify('Video removed');
      this.updateNotify();
      setTimeout(() => {
        if (i === this.currentPlaylistItem) {
          this.currentPlaylistItem = -1;
        }
        this.playlistVideos.splice(i, 1);
        this.updatePlaylist();
      }, 200);
  }

  addPlaylistItem(i: number, list: number) {
      let listType;
      let playlistItem;
      if (list === 0) {
        listType = this._shared.feedVideos[i];
      }
      if (list === 1) {
        listType = this._shared.lastSearchedVideos[i];
      }
      if (list === 2) {
        listType = this.relatedVideos[i];
      }
      if (list === 3) {
        listType = this.currentVideoObject[i];
      }
      if (list === 4) {
        listType = this._shared.historyVideos[i];
      }

      if (typeof listType.id.videoId !== 'undefined') {
        playlistItem = this.playlistVideos.find(item => item.id.videoId === listType.id.videoId);
      } else {
        playlistItem = this.playlistVideos.find(item => item.id === listType.id);
      }

      if (typeof playlistItem === 'undefined') {
        this.playlistVideos.push(listType);
        this.updatePlaylist();

        this._shared.triggerNotify('Added to playlist');
        this.updateNotify();
        this.scrollToBottom();
      } else {
        this._shared.triggerNotify('Video is already in playlist');
        this.updateNotify();
      }
  }

  clearPlaylist() {
      this.currentPlaylistItem = -1;
      this.playlistVideos = [];
      this._shared.playlist = [];
      this._shared.updatePlaylist();
  }

  exportPlaylist() {
      this.showExportPlaylistModal();
  }

  exportFilePlaylist() {
      const a = document.createElement('a');
      const file = new Blob([JSON.stringify(this.playlistVideos)], {type: 'data:text/json;charset=utf8'});
      a.href = URL.createObjectURL(file);
      a.download = 'playlist.json';
      a.click();
  }

  importPlaylist(input: any) {
    this.playlistVideos = this.tempPlaylist;
    this._shared.playlist = this.tempPlaylist;
    this.tempPlaylist = [];
    this._shared.updatePlaylist();
    this.closeModal();
  }

  // ---------------- Init settings ----------------

  initDragula() {
    this.dragula.setOptions('playlistVideos', {
      moves: (el, container, handle) => {
        return handle.className === 'video-item-settings';
      }
    });
    this.dragula.over.subscribe((value) => {
      const [e, el, container] = value.slice(1);
      this.addClass(el, 'ex-over');
    });
    this.dragula.out.subscribe((value) => {
      const [e, el, container] = value.slice(1);
      this.removeClass(el, 'ex-over');
      this.updatePlaylist();
    });
    this.dragula.drop.subscribe((value) => {
      const [e, el, container] = value.slice(1);
      this.removeClass(el, 'ex-over');
      this.updatePlaylist();
    });
  }

  preventOldSettings() {
    if (localStorage.length === 1 || !localStorage.getItem('version')) {
      console.log('Updating localstorage...');
      localStorage.clear();
      this._shared.settings = null;
      this._shared.playlist = null;

      this.playlistVideos = [];
    }
  }

  setSettings() {
    this._shared.getSettings();
    if (this._shared.settings) {
      this.regionCode = this._shared.settings.api_settings[1].value;
      this.thumbnails = this._shared.settings.form_settings[0].value;
      this.displayVideoPlayer = this._shared.settings.form_settings[2].value;
      this.repeatMode = this._shared.settings.form_settings[3].value;
      this.darkMode = this._shared.settings.form_settings[4].value;
    }
  }

  toggleHeadSettings(int: number) {
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


  // ---------------- Video fetching ----------------

  onClickRelated(event: Event, i: number) {
    this.getVideo(this.relatedVideos[i]);
  }

  onClickPlaylist(event: Event, i: number) {
    if (i === this.currentPlaylistItem) {
      this.playPauseVideo();
    } else {
      this.getVideo(this.playlistVideos[i]);
    }
  }

  getVideo(data: any) {
    this.setCurrentVideoObject(data);
    if (data.id.videoId) {
      this.getStatsVideos(data.id.videoId);
    } else if (data.id) {
      this.getStatsVideos(data.id);
    }
    this.playVideo(data);
  }

  playVideo(data: any) {
    if (data.id !== this.currentVideo.id || this.currentState === -1) {
      if (typeof data.id.videoId !== 'undefined') {
        this.currentVideo.id = data.id.videoId;
      } else {
        this.currentVideo.id = data.id;
      }
      this.currentVideo.title = data.snippet.title;
      this._shared.addHistoryVideo(data);
      this.player.loadVideoById(this.currentVideo.id);
      this.getRelatedVideos();
      this.findPlaylistItem();
    }
  }

  async getStatsVideos(query: string) {
    const res = await this.youtube.statsVideos(query);
    this.currentVideo.id = res['items'][0].id;
    this.currentVideo.title = res['items'][0].snippet.title;
    this.currentVideo.channelTitle = res['items'][0].snippet.channelTitle;
    this.currentVideo.stats.likes = res['items'][0].statistics.likeCount;
    this.currentVideo.stats.dislikes = res['items'][0].statistics.dislikeCount;
    this.currentVideo.stats.views = res['items'][0].statistics.viewCount;
    this.shareLink = 'https://youtu.be/' + this.currentVideo.id;
  }

  async getRelatedVideos() {
    const res = await this.youtube.relatedVideos(this.currentVideo.id);
    this.relatedVideos = res['items'];
    if (this.playlistPrefill) {
      this.playlistInit();
      this.playlistPrefill = false;
    }
  }

  // ---------------- Player controls ----------------

  playPauseVideo() {
    if (this.currentState === 1) {
      this.player.pauseVideo();      
    } else {
      this.player.playVideo();
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
    if (this.currentState !== -1 && this.currentState !== 1) {
      this.player.playVideo();
    }
    if (this.currentState === 1) {
      this.startRange();
    } else {
      this.stopRange();
    }

    this.videoCurRange = value;
    this.videoRangePercent = (this.videoCurRange / this.videoMaxRange) * 100;
    this.videoCurFull = this.timeFormat(this.videoCurRange);

    this.player.seekTo(this.videoCurRange, true);
    this.videoRangeMouseActive = false;
    // this.dbcrud.update('sessions', 'currentSeek', this.videoCurRange);
  }

  volumeRangeMouseMove(value: number) {
    if (this.volumeRangeMouseActive) {
      if (this.currentMuteState) {
        this.player.unMute();
        this.currentMuteState = false;
      }
    }
  }

  volumeRangeMouseUp(value: number) {
    if (this.currentMuteState) {
      this.player.unMute();
      this.currentMuteState = false;
    }
    this.player.setVolume(value);
  }

  checkVolumeRange() {
    if (this.currentState !== -1) {
      this.currentMuteState = this.player.isMuted();
      this.videoCurVolume = this.player.getVolume();
    }
  }

  // ---------------- Modal functions ----------------

  closeModal() {
    this.modal = false;
    this.modalPlaylist = false;
    this.modalExportPlaylist = false;
  }

  showPlaylistModal(i: number) {
    this.modal = true;
    this.modalPlaylist = true;
    this.modalPlaylistItem = i;
  }

  showExportPlaylistModal() {
    this.modal = true;
    this.modalExportPlaylist = true;
  }

  confirmModal() {
    this.removePlaylistItem(this.modalPlaylistItem);
    this.modal = false;
  }

  // ---------------- Related functions ----------------

  openMobileMenu() {
    if (this.menuActive) {
      this.menuActive = false;
    } else {
      this.menuActive = true;
    }
  }

  onCopyVideoItemLink(i: number, list: number) {
    let listType;
    const youtubeLink = 'https://youtu.be/';
    if (list === 0) {
      listType = this._shared.feedVideos[i];
    }
    if (list === 1) {
      listType = this._shared.lastSearchedVideos[i];
    }
    if (list === 2) {
      listType = this.relatedVideos[i];
    }
    if (list === 3) {
      listType = this.playlistVideos[i];
    }
    if (list === 4) {
      listType = this._shared.historyVideos[i];
    }

    if (typeof listType.id.videoId !== 'undefined') {
      this.videoItemIDvalue.nativeElement.value = youtubeLink + listType.id.videoId;
    } else {
      this.videoItemIDvalue.nativeElement.value = youtubeLink + listType.id;
    }
    this.videoItemIDvalue.nativeElement.select();
    this.videoItemIDvalue.nativeElement.focus();
    document.execCommand('copy');
    this.videoItemIDvalue.nativeElement.blur();
    this.copyShareLink();
  }

  scrollToBottom() {
      try {
        setTimeout( () => {
          this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        }, 200);
      } catch (err) {
        console.log(err);
        console.log('scroll issue');
      }
  }


  copyShareLink() {
    if (!this.notify.enabled) {
      document.execCommand('Copy');
      this._shared.triggerNotify('Copied');
      this.updateNotify();
    } else {
      setTimeout(() => {
          document.execCommand('Copy');
          this._shared.triggerNotify('Copied');
          this.updateNotify();
      }, 1000);
    }
  }

  updateNotify() {
    this.notify = this._shared.notify;
    setTimeout(() => this.notify = this._shared.notify, 1000);
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

  // @HostListener('window:beforeunload')
  // doSomething() {
  //   this.dbcrud.update('sessions', 'currentState', -1);
  // }

}
