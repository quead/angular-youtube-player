import { Component, ElementRef, ViewChild, OnInit, HostListener } from '@angular/core';
import { YoutubeGetVideo } from './services/youtube.service';
import { SharedService } from './services/shared.service';
import { GlobalsService } from './services/globals.service';
import { PlaylistControlService } from './services/playlist-control.service';
import { PlayerComponent } from './components/player/player.component';
import { PlaylistComponent } from './components/playlist/playlist.component';
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
  providers: [ AuthService, DbCrudService, AngularFirestore, PlaylistComponent ]
})

export class AppComponent implements OnInit {
  @ViewChild('videoItemIDvalue') private videoItemIDvalue: ElementRef;

  constructor(
    private youtube: YoutubeGetVideo,
    public shared: SharedService,
    public globals: GlobalsService,
    public playlistCTRL: PlaylistControlService,

    private authService: AuthService,
    public afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private db2: AngularFireDatabase,
    private dbcrud: DbCrudService,
    public playerComp: PlayerComponent,
    public playlist: PlaylistComponent
  ) {
  }

  ngOnInit() {
    this.shared.preventOldSettings();
    this.updateUserDetails();
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
      this.globals.isLoading = false;      
    });
    this.playlistCTRL.fillPlaylist();
    this.shared.findPlaylistItem();
  }

  // ---------------- Video fetching ----------------

  onClickRelated(event: Event, i: number) {
    this.playerComp.getVideo(this.globals.relatedVideos[i]);
  }

  // ---------------- Related functions ----------------
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
