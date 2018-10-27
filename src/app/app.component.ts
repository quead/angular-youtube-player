import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { SharedService } from './services/shared.service';
import { GlobalsService } from './services/globals.service';
import { PlaylistControlService } from './services/playlist-control.service';

@Component({
    selector: 'app-yt',
    templateUrl: 'app.component.html',
    providers: [ PlaylistControlService ]
})

export class AppComponent implements OnInit {
    @ViewChild('videoItemIDvalue') videoItemIDvalue: ElementRef;

    constructor(
        public shared: SharedService,
        public globals: GlobalsService,
        public playlistCTRL: PlaylistControlService,
    ) {
        localStorage.removeItem('firebase:previous_websocket_failure');
    }

    ngOnInit() {
        this.globals.videoItemIDvalue = this.videoItemIDvalue;
        this.shared.preventOldSettings();
    }

    // ---------------- Update app ----------------
    setApp() {
        this.shared.initFeed().then(() => {
            this.playlistCTRL.fillPlaylist();
        });
    }
}
