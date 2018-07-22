import { Component, ElementRef, ViewChild, OnInit, HostListener } from '@angular/core';
import { SharedService } from './services/shared.service';
import { GlobalsService } from './services/globals.service';
import { PlaylistComponent } from './components/playlist/playlist.component';

// DB
import { DbCrudService } from './services/db-crud.service';
import { AuthService } from './services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore } from 'angularfire2/firestore';


@Component({
  selector: 'app-yt',
  templateUrl: 'app.component.html',
  providers: [ AuthService, DbCrudService, AngularFirestore, PlaylistComponent ]
})

export class AppComponent implements OnInit {
  @ViewChild('videoItemIDvalue') videoItemIDvalue: ElementRef;

  constructor(
    public shared: SharedService,
    public globals: GlobalsService,
    private authService: AuthService,
    public afAuth: AngularFireAuth,
    private db2: AngularFireDatabase,
    public playlistComp: PlaylistComponent,
  ) {
  }

  ngOnInit() {
    this.globals.videoItemIDvalue = this.videoItemIDvalue;
    this.shared.preventOldSettings();
    this.updateUserDetails();
  }

  // ---------------- User ------------------
  myfunc(event: Event) {
      // carouselLoad will trigger this funnction when your load value reaches
      // it is helps to load the data by parts to increase the performance of the app
      // must use feature to all carousel
  }

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
   this.shared.initFeed().then(() => {
      this.playlistComp.initPlaylist();
   })
  }

  // ---------------- Video fetching ----------------

  // @HostListener('window:beforeunload')
  // doSomething() {
  //   this.dbcrud.update('sessions', 'currentState', -1);
  // }

}
