import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { SharedService } from './services/shared.service';
import { GlobalsService } from './services/globals.service';
import { PlaylistComponent } from './components/playlist/playlist.component';

// DB
import { DbCrudService } from './services/db-crud.service';
import { AuthService } from './services/auth.service';


@Component({
    selector: 'app-yt',
    templateUrl: 'app.component.html',
    providers: [ AuthService, DbCrudService, PlaylistComponent ]
})

export class AppComponent implements OnInit {
    @ViewChild('videoItemIDvalue') videoItemIDvalue: ElementRef;
    sessionValue: any;
    sessionInput: any;

    constructor(
        public shared: SharedService,
        public globals: GlobalsService,
        private authService: AuthService,
        public playlistComp: PlaylistComponent,
    ) {
    }

    ngOnInit() {
        this.globals.videoItemIDvalue = this.videoItemIDvalue;
        this.shared.preventOldSettings();
        this.updateUserDetails();
    }

    // ---------------- User ------------------
    loginGoogle() {
        this.authService.login();
    }

    logout() {
        this.authService.logout();
    }

    updateUserDetails() {
        // To fix update in realtime
        this.authService.checkLogged();
        this.shared.getSettings();
        this.setApp();
        this.sessionValue = localStorage.getItem('session_key');
    }

    // ---------------- Session ----------------
    getSession() {
        console.log('get session');
        // this.authService.getSession(this.sessionValue);
    }
    // showSession() {
    //     console.log('show session');
    // }
    updateKey(value: string) {
        // this.sessionValue = value;
        this.sessionValue = value;
        localStorage.setItem('session_key', this.sessionValue);
    }
    updateSession() {
        this.authService.updateSession();
    }
    // ---------------- Init player ----------------
    setApp() {
        this.shared.initFeed().then(() => {
            this.playlistComp.initPlaylist();
        })
    }
}
