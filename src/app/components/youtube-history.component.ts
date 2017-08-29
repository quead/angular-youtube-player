import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { SharedService } from '../shared/lists.service';

@Component({
  selector: 'app-history',
  templateUrl: 'youtube-history.component.html'
})

export class HistoryComponent implements OnInit {

  _shared: any;
  _app: any;
  historyVideos: Array<any>;

  thumbnails = false;

  constructor(
    private shared: SharedService,
    private app: AppComponent
  ) {
    this._shared = shared;
    this._app = app;
  }

  ngOnInit() {
    console.log('history');
    this.initHistory();
    this.getSettings();
  }

  initHistory() {
    this.historyVideos = this._shared.historyVideos;
  }

  getSettings() {
    this._shared.getSettings().subscribe(data => {
        this.thumbnails = data.form_settings[0].value;
    });
  }

  onClickHistory(event: Event, i: number) {
    this._app.playVideo(this.historyVideos[i]);
  }

}
