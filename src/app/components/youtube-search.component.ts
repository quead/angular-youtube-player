import { Component, OnInit } from '@angular/core';
import { YoutubeGetVideo } from '../config/youtube.config';
import { SharedService } from '../config/shared.module';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-search',
  templateUrl: 'youtube-search.component.html',
})

export class SearchComponent implements OnInit {

  searchForm: FormGroup;

  debuggingInfo = false;
  searchVideoImage = false;

  videos: any;
  feedVideos: any;

  _shared: any;

  constructor(private youtube: YoutubeGetVideo, shared: SharedService) {
    this._shared = shared;
  }

  ngOnInit() {
    console.log('search');
    this.searchFunction();
    this.getFeedVideos();
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

  getFeedVideos() {
      this._shared.getFeed().subscribe(data => {
        if(data) {
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
    console.log(i, list);
    if (list === 1) {
      const videoID = this.videos[i].id.videoId;
      const videoName = this.videos[i].snippet.title;
      //this._app.getVideo(videoID, videoName);
    } else if (list === 3) {
      const videoID = this.feedVideos[i].id;
      const videoName = this.feedVideos[i].snippet.title;
      //this._app.getVideo(videoID, videoName);
    }
    this.clearSearch();
  }

  changeStates(event) {
    // Trigger from youtube-settings.component
    if (event.settings[0].selected != null) {
      this.debuggingInfo = event.settings[0].selected;
    } else {
      this.debuggingInfo = event.settings[0];
    }

    if (event.settings[1].selected != null) {
      this.searchVideoImage = event.settings[1].selected;
    } else {
      this.searchVideoImage = event.settings[1];
    }
  }

}
