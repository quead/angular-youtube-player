import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { SharedService } from './services/shared.service';
import { NotifyService } from './services/notify.service';
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
        public notify: NotifyService
    ) {
    }

    ngOnInit() {
        this.globals.videoItemIDvalue = this.videoItemIDvalue;
    }
}
