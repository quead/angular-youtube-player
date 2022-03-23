import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { NotifyService } from 'src/app/services/notify.service';
import { PlaylistControlService } from 'src/app/services/playlist-control.service';
import { SharedService } from 'src/app/services/shared.service';
import { GlobalsService } from '../../services/globals.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-youtube-player';

  @ViewChild('videoItemIDvalue', { static: true })
  videoItemIDvalue!: ElementRef;
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const pos =
      (document.documentElement.scrollTop || document.body.scrollTop) +
      document.documentElement.offsetHeight;
    const max = document.documentElement.scrollHeight;
    if (pos === max) {
      console.log('End of page');
      // To check if is on homepage and implement virtual scroll
      // this.shared.initFeed('', this.globals.nextPageToken)
    }
  }

  constructor(
    public shared: SharedService,
    public globals: GlobalsService,
    public playlistCTRL: PlaylistControlService,
    public notify: NotifyService
  ) {}

  ngOnInit() {
    this.globals.videoItemIDvalue = this.videoItemIDvalue;
  }
}
