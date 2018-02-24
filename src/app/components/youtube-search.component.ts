import { Component, OnInit } from '@angular/core';
import { YoutubeGetVideo } from '../shared/youtube.service';
import { AppComponent } from '../app.component';
import { SharedService } from '../shared/lists.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import 'rxjs/add/operator/map';

import { IFeedVideo } from '../models/feed-video.model';
import { ISearchVideo } from '../models/search-video.model';
import { IChannelList } from '../models/channel.model';

@Component({
  selector: 'app-search',
  templateUrl: 'youtube-search.component.html'
})

export class SearchComponent implements OnInit {

  searchForm: FormGroup;
  thumbnails = false;

  videos: Array<ISearchVideo>;
  feedVideos: Array<IFeedVideo>;
  channel: IChannelList;
  categories: any;
  categoriesBlocked = ['19', '22', '25', '27']

  _shared: any;
  _app: any;

  trendingFirst = {
      bannerURL: '',
      video: {
        id: '',
        title: '',
        img: '',
        channelTitle: '',
        stats: {
          views: '',
          likes: '',
          dislikes: ''
        }
      },
      stats: {
        subscribers: '',
        views: '',
        videoCount: ''
      }
  };

  public listGrid = false;

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
    this.setSettings();
    this.searchFunction();
  
    this.getFeedVideos();
  
    this.getCategories();
  }

  async getCategories() {
    const res = await this.youtube.categories();
    this.categories = res;
  }

  async getCategoriesVideos(val: number) {
    const res2 = await this.youtube.videoCategories(val);
    this.feedVideos = res2['items'];
  }

  async setSettings() {
    this.thumbnails = this._shared.settings.form_settings[0].value;
    this.listGrid = this._shared.settings.form_settings[1].value;
  }

  async getFeedVideos() {
    await this._shared.initFeed();
    await this._shared.initChannel();
    this.feedVideos = this._shared.feedVideos;
    this.channel = this._shared.channel;
    this.getChannelTrending();
  }

  async searchVideo(query: any) {
    const res = await this.youtube.searchVideo(query);
    this.videos = res['items'];
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

  getChannelTrending() {
    this.feedVideos = this._shared.feedVideos;
    this.channel = this._shared.channel;
    this.trendingFirst.video.id = this.feedVideos[0].id;
    this.trendingFirst.video.title = this.feedVideos[0].snippet.title;
    this.trendingFirst.video.img = this.feedVideos[0].snippet.thumbnails.medium.url;
    this.trendingFirst.video.stats.likes = this.feedVideos[0].statistics.likeCount;
    this.trendingFirst.video.stats.dislikes = this.feedVideos[0].statistics.dislikeCount;
    this.trendingFirst.video.stats.views = this.feedVideos[0].statistics.viewCount;
    this.trendingFirst.bannerURL = this.channel.items[0].brandingSettings.image.bannerTabletHdImageUrl;
    this.trendingFirst.video.channelTitle = this.channel.items[0].snippet.title;
    if (!this.channel.items[0].statistics.hiddenSubscriberCount) {
      this.trendingFirst.stats.subscribers = this.channel.items[0].statistics.subscriberCount;
    } else {
      this.trendingFirst.stats.subscribers = '0';
    }
    this.trendingFirst.stats.videoCount = this.channel.items[0].statistics.videoCount;
    this.trendingFirst.stats.views = this.channel.items[0].statistics.viewCount;
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
      this._app.getVideo(this.feedVideos[i]);
    }
  }

  onCopyVideoItemLink(i: number, list: number) {
      this._app.onCopyVideoItemLink(i, list);
  }

  addPlaylistItem(i: number, list: number) {
      this._app.addPlaylistItem(i, list);
  }
}
