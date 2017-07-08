import { Component, OnInit } from '@angular/core';
import { YoutubeGetVideo } from '../config/youtube.config';
import { AppComponent } from '../app.component';
import { SharedService } from '../config/shared.module';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-search',
  templateUrl: 'youtube-search.component.html'
})

export class SearchComponent implements OnInit {

  searchForm: FormGroup;

  searchVideoImage = false;

  videos: any;
  feedVideos: any;

  _shared: any;
  _app: any;

  constructor(
    private youtube: YoutubeGetVideo,
    private shared: SharedService,
    private app: AppComponent
  ) {
    this._shared = shared;
    this._app = app;
  }

  ngOnInit() {
    console.log('search');
    this.searchFunction();
    this.getFeedVideos();
    this.getSettings();
  }

  searchFunction() {
    this.searchForm = new FormGroup({
      searchInput: new FormControl('', [Validators.required, Validators.minLength(2)])
    });

    this.searchForm.valueChanges.subscribe((form) => {
        this.youtube.searchVideo(form.searchInput).subscribe(
          result => {
            if (!this.searchForm.invalid) {
              this.videos = result.items;
            } else {
              this.videos = null;
            }
          },
          error => {
            console.log('error on search');
          }
        );
    });
  }

  getSettings() {
    this._shared.getSettings().subscribe(data => {
      if (data) {
        this.searchVideoImage = data[1].selected;
      }
    });
  }

  getFeedVideos() {
      this._shared.getFeed().subscribe(data => {
        if (data) {
          this.feedVideos = data;
        }
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
      const videoID = this.videos[i].id.videoId;
      const videoName = this.videos[i].snippet.title;
      this._app.getVideo(videoID, videoName);
      this.clearSearch();
    } else if (list === 3) {
      const videoID = this.feedVideos[i].id;
      const videoName = this.feedVideos[i].snippet.title;
      this._app.getVideo(videoID, videoName);
    }
  }

  setSettings(data: any, from: number) {
    if (from === 0) {
      this.searchVideoImage = data[from].selected;
    }
  }

}
