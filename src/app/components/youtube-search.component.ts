import { Component, OnInit } from '@angular/core';
import { YoutubeGetVideo } from '../shared/youtube.service';
import { AppComponent } from '../app.component';
import { SharedService } from '../shared/lists.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IFeedVideo } from '../models/feed-video.model';
import { ISearchVideo } from '../models/search-video.model';
import { IChannelList } from '../models/channel.model';

@Component({
  selector: 'app-search',
  templateUrl: 'youtube-search.component.html',
})

export class SearchComponent implements OnInit {

  searchForm: FormGroup;
  noResults = false;
  thumbnails = true;

  videos: Array<ISearchVideo>;

  _shared: any;
  _app: any;

  constructor(
    private youtube: YoutubeGetVideo,
    private shared: SharedService,
    private app: AppComponent,
  ) {
    this._shared = shared;
    this._app = app;
  }

  ngOnInit() {
    console.log('search');
    this.setSettings();
    this.searchFunction();
  }

  async setSettings() {
    this.thumbnails = this._shared.settings.form_settings[0].value;
  }

  async searchVideo(query: any) {
    const res = await this.youtube.searchVideo(query);
    this.videos = res['items'];
    if (res['items'].length === 0) {
      this.noResults = true;
    } else {
      this.noResults = false;
    }
    this._shared.lastSearchedVideos = res['items'];
  }

  searchFunction() {
    this.searchForm = new FormGroup({
      searchInput: new FormControl('', [Validators.required, Validators.minLength(2)])
    });

    this.searchForm.valueChanges.subscribe((form) => {
      this.searchVideo(form.searchInput);
    });
  }

  clearSearch() {
    this.searchForm.reset();
    this.videos = null;
  }

  onSubmit(event: Event) {
    event.preventDefault();
  }

  onClickVideo(event: Event, i: any, list: number) {
    if (list === 1) {
      this._app.getVideo(this.videos[i]);
      this.clearSearch();
    } else if (list === 3) {
      this._app.getVideo(this._shared.feedVideos[i]);
    }
    this.clearSearch();
  }

  onCopyVideoItemLink(i: number, list: number) {
    this._app.onCopyVideoItemLink(i, list);
    this.clearSearch();
  }

  addPlaylistItem(i: number, list: number) {
    this._app.addPlaylistItem(i, list);
    this.clearSearch();
  }
}
