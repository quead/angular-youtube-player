import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { GlobalsService } from '../services/globals.service';

@Component({
  selector: 'app-history',
  templateUrl: 'youtube-history.component.html'
})

export class HistoryComponent implements OnInit {

  constructor(
    private globals: GlobalsService,
    private app: AppComponent
  ) {
  }

  ngOnInit() {
    console.log('history');
  }

  addPlaylistItem(i: number, list: number) {
      this.app.addPlaylistItem(i, list);
  }

  onCopyVideoItemLink(i: number, list: number) {
    this.app.onCopyVideoItemLink(i, list);
  }

  onClickHistory(event: Event, i: number) {
    this.app.getVideo(this.globals.historyVideos[i]);
  }

}
