import { Component, ElementRef, ViewChild, OnInit, HostListener } from '@angular/core';
import { YoutubeGetVideo } from './services/youtube.service';
import { SharedService } from './services/shared.service';
import { GlobalsService } from './services/globals.service';
import { PlaylistControlService } from './services/playlist-control.service';
import { PlayerComponent } from './components/player/player.component';
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

  tempPlaylist: Array<VideoModel> = [];

  menuActive = false;

  modal = false;
  modalPlaylist = false;
  modalExportPlaylist = false;
  modalPlaylistItem: number;

  loading = true;

  importPlaylistInput: any;

  constructor(
    private youtube: YoutubeGetVideo,
    public shared: SharedService,
    public globals: GlobalsService,
    public playlistCTRL: PlaylistControlService,
    private dragula: DragulaService,

    private authService: AuthService,
    public afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private db2: AngularFireDatabase,
    private dbcrud: DbCrudService,
    public playerComp: PlayerComponent
  ) {
  }

  ngOnInit() {
    this.shared.preventOldSettings();
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
        this.setApp();
      }
    });
  }

  // ---------------- Init player ----------------

  setApp() {
    this.shared.initFeed().then(data => {
      this.initApp();
    });
  }

  initApp() {
    this.shared.getRelatedVideos().then(() => {
      this.loading = false;      
    });
    this.playlistCTRL.fillPlaylist();
    this.shared.findPlaylistItem();
  }

  // ---------------- Playlist settings ----------------

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

  removePlaylistItem(i: number) {
      this.shared.triggerNotify('Video removed');
      setTimeout(() => {
        if (i === this.globals.currentPlaylistItem) {
          this.globals.currentPlaylistItem = -1;
        }
        this.globals.playlistVideos.splice(i, 1);
        this.shared.checkPlaylist();
      }, 200);
  }

  addPlaylistItem(i: number, list: number) {
    this.playlistCTRL.addPlaylistItem(i, list, this.myScrollContainer);
  }

  clearSession() {
    this.globals.currentPlaylistItem = -1;
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
      this.shared.checkPlaylist();
    });
    this.dragula.drop.subscribe((value) => {
      const [e, el, container] = value.slice(1);
      this.removeClass(el, 'ex-over');
      this.shared.checkPlaylist();
    });
  }

  // ---------------- Video fetching ----------------

  onClickRelated(event: Event, i: number) {
    this.playerComp.getVideo(this.globals.relatedVideos[i]);
  }

  onClickPlaylist(event: Event, i: number) {
    if (i === this.globals.currentPlaylistItem) {
      this.playerComp.playPauseVideo();
    } else {
      this.playerComp.getVideo(this.globals.playlistVideos[i]);
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

    this.videoItemIDvalue.nativeElement.value = youtubeLink + listType.id;

    this.videoItemIDvalue.nativeElement.select();
    this.videoItemIDvalue.nativeElement.focus();
    document.execCommand('copy');
    this.videoItemIDvalue.nativeElement.blur();
    this.shared.copyShareLink();
  }

  // @HostListener('window:beforeunload')
  // doSomething() {
  //   this.dbcrud.update('sessions', 'currentState', -1);
  // }

}
