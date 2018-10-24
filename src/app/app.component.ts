import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { SharedService } from './services/shared.service';
import { GlobalsService } from './services/globals.service';
import { PlaylistControlService } from './services/playlist-control.service';

// DB
import { DbCrudService } from './services/db-crud.service';
import { AuthService } from './services/auth.service';


@Component({
    selector: 'app-yt',
    templateUrl: 'app.component.html',
    providers: [ AuthService, DbCrudService, PlaylistControlService ]
})

export class AppComponent implements OnInit {
    @ViewChild('videoItemIDvalue') videoItemIDvalue: ElementRef;

    constructor(
        public shared: SharedService,
        public globals: GlobalsService,
        private authService: AuthService,
        public playlistCTRL: PlaylistControlService,
    ) {
    }

    ngOnInit() {
        this.globals.videoItemIDvalue = this.videoItemIDvalue;
        this.shared.preventOldSettings();
    }

    // ---------------- User ------------------
    loginGoogle() {
        this.authService.login();
    }

    logout() {
        this.authService.logout();
    }

    // ---------------- Update app ----------------
    setApp() {
        this.shared.initFeed().then(() => {
            this.playlistCTRL.fillPlaylist();
        })
    }
}
