import { Component, ElementRef, ViewChild, OnInit, HostListener } from '@angular/core';
import { YoutubeGetVideo } from './services/youtube.service';
import { SharedService } from './services/shared.service';
import { GlobalsService } from './services/globals.service';
import { Event } from '@angular/router/src/events';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { VideoModel } from './models/video.model';

// DB
import { DbCrudService } from './services/db-crud.service';
import { AuthService } from './services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-yt',
  templateUrl: 'app.component.html',
  providers: [ AuthService, DbCrudService, AngularFirestore ]
})

export class AppComponent implements OnInit {
  @ViewChild('playlistContainer') private myScrollContainer: ElementRef;
  @ViewChild('videoItemIDvalue') private videoItemIDvalue: ElementRef;

  videoRangePercent = 0;

  tempPlaylist: Array<VideoModel> = [];

  menuActive = false;

  modal = false;
  modalPlaylist = false;
  modalExportPlaylist = false;
  modalPlaylistItem: number;

  playlistPrefill = true;
  currentPlaylistItem: number;
  shareLink = '';

  player: YT.Player;

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

  loading = true;

  importPlaylistInput: any;

  constructor(
    private youtube: YoutubeGetVideo,
    public shared: SharedService,
    public globals: GlobalsService,
    private dragula: DragulaService,

    private authService: AuthService,
    public afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private db2: AngularFireDatabase,
    private dbcrud: DbCrudService
  ) {
  }

  ngOnInit() {
    this.preventOldSettings();
    this.updateUserDetails();
    this.initDragula();
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
    this.authService.login(this.globals.currentVideo);
  }

  logout() {
    this.authService.logout();
  }

   updateUserDetails() {
    // To fix update in realtime
    this.authService.checkLogged();
    this.db2.list('sessions/' + localStorage.getItem('session_key')).valueChanges().subscribe((data) => {
      if (data.length > 0) {
        // localStorage.setItem('settings', JSON.parse(data['3']));
        // this.shared.getSettings();
        // this.setDefaultPlayer();
      } else {
        this.shared.getSettings();
        this.setDefaultPlayer();
      }
    });
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

  setDefaultPlayer() {
    this.shared.initFeed().then(data => {
      this.initPlayer();
    });
  }

  initPlayer() {
    this.globals.currentVideo = this.globals.feedVideos[0];
    this.shareLink = 'https://youtu.be/' + this.globals.currentVideo['id'];
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
      if (this.globals.repeatMode) {
        if (this.globals.playlistVideos.length) {
          this.findPlaylistItem();
          if (this.currentPlaylistItem < 0) {
            this.playPlaylistItem('next', this.currentPlaylistItem);
          } else {
            this.playPlaylistItem('next', this.currentPlaylistItem);
          }
          if (this.globals.playlistVideos.length === 1) {
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
    this.shared.updatePlaylist();
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
      this.globals.playlistVideos = this.globals.relatedVideos;
      this.shared.updatePlaylist();
    } else {
      this.shared.getPlaylist();
    }
    this.findPlaylistItem();
  }

  findPlaylistItem() {
    const playlistItem = this.globals.playlistVideos.find(item => item.id === this.globals.currentVideo['id']);
    this.currentPlaylistItem = this.globals.playlistVideos.indexOf(playlistItem);
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

  removePlaylistItem(i: number) {
      this.shared.triggerNotify('Video removed');
      setTimeout(() => {
        if (i === this.currentPlaylistItem) {
          this.currentPlaylistItem = -1;
        }
        this.globals.playlistVideos.splice(i, 1);
        this.updatePlaylist();
      }, 200);
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
        this.updatePlaylist();

        this.shared.triggerNotify('Added to playlist');
        this.scrollToBottom();
      } else {
        this.shared.triggerNotify('Video is already in playlist');
      }
  }

  clearPlaylist() {
    this.currentPlaylistItem = -1;
    this.globals.playlistVideos = [];
    this.shared.updatePlaylist();
  }

  clearSession() {
    this.currentPlaylistItem = -1;
    this.globals.currentVideo = null;
    this.globals.playlistVideos = [];
    this.globals.relatedVideos = [];
    localStorage.removeItem('playlist');
    // localStorage.removeItem('settings');
  }

  exportPlaylist() {
      this.showExportPlaylistModal();
  }

  exportFilePlaylist() {
      const a = document.createElement('a');
      const file = new Blob([JSON.stringify(this.globals.playlistVideos)], {type: 'data:text/json;charset=utf8'});
      a.href = URL.createObjectURL(file);
      a.download = 'playlist.json';
      a.click();
  }

  importPlaylist(input: any) {
    this.globals.playlistVideos = this.tempPlaylist;
    this.tempPlaylist = null;
    this.shared.updatePlaylist();
    this.closeModal();
  }

  // ---------------- Init settings ----------------

  initDragula() {
    this.dragula.setOptions('globals.playlist', {
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
    if (localStorage.length === 1 || !localStorage.getItem('version') || localStorage.getItem('version') === '1') {
      console.log('Updating localstorage...');
      localStorage.clear();
      this.globals.settings = null;
      this.globals.playlistVideos = [];
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
    this.getVideo(this.globals.relatedVideos[i]);
  }

  onClickPlaylist(event: Event, i: number) {
    if (i === this.currentPlaylistItem) {
      this.playPauseVideo();
    } else {
      this.getVideo(this.globals.playlistVideos[i]);
    }
  }

  getVideo(data: any) {
    this.getStatsVideos(data.id);
    this.playVideo(data);
  }

  playVideo(data: any) {
    if (data.id !== this.globals.currentVideo['id'] || this.currentState === -1) {
      this.globals.currentVideo = data;
      this.shared.addHistoryVideo(data);
      this.player.loadVideoById(this.globals.currentVideo['id']);
      this.getRelatedVideos();
      this.findPlaylistItem();
    }
  }

  async getStatsVideos(query: string) {
    const res = await this.youtube.statsVideos(query);
    this.shared.convertVideoObject(res, 'currentVideo');
    this.shareLink = 'https://youtu.be/' + this.globals.currentVideo['id'];
  }

  async getRelatedVideos() {
    const res = await this.youtube.relatedVideos(this.globals.currentVideo['id']);
    this.shared.convertVideoObject(res['items'], 'relatedVideos');
    if (this.playlistPrefill) {
      this.playlistInit();
      this.playlistPrefill = false;
    }
    this.loading = false;
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
      listType = this.globals.feedVideos[i];
    }
    if (list === 1) {
      listType = this.globals.lastSearchedVideos[i];
    }
    if (list === 2) {
      listType = this.globals.relatedVideos[i];
    }
    if (list === 3) {
      listType = this.globals.playlistVideos[i];
    }
    if (list === 4) {
      listType = this.globals.historyVideos[i];
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
      document.execCommand('Copy');
      this.shared.triggerNotify('Copied');
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
