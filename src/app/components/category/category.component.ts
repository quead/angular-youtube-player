import { Component, OnInit } from '@angular/core';
import { YoutubeGetVideo } from '../../services/youtube.service';
import { AppComponent } from '../../app.component';
import { SharedService } from '../../services/shared.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { IFeedVideo } from '../../models/feed-video.model';
import { IChannelList } from '../../models/channel.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
})
export class CategoryComponent implements OnInit {

  feedVideos: Array<IFeedVideo>;
  channel: IChannelList;
  categories: any;
  currentCategory: string;
  categoriesBlocked = ['19', '22', '25', '27', '29'];

  thumbnails = false;
  loading = true;
  listGrid = false;

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

  _shared: any;
  _app: any;

  constructor(
    private youtube: YoutubeGetVideo,
    private shared: SharedService,
    private app: AppComponent,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this._shared = shared;
    this._app = app;
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(data => {
      if (data['params'].id === 'all') {
        this.getFeedVideos();
      } else {
        this.currentCategory = data['params'].id;
      }
      this.setSettings();
    });
  }


  async getCategories() {
    const res = await this.youtube.categories();
    this.categories = res;
    if (res) {
      if (res['items'].find(x => x.id === this.currentCategory)) {
        this.getCategoriesVideos(this.currentCategory);
      } else {
        this.router.navigate(['']);
      }
    }
  }

  async getCategoriesVideos(val: string) {
    const res2 = await this.youtube.videoCategories(val);
    this.feedVideos = res2['items'];
    this._shared.feedVideos = res2['items'];

    await this._shared.initChannel();
    this.getChannelTrending();
  }

  async setSettings() {
    if (this._shared.settings) {
      this.thumbnails = this._shared.settings.form_settings[0].value;
      this.listGrid = this._shared.settings.form_settings[1].value;
      this._shared.setApiSettings();
      this.getCategories();
    } else {
      await this._shared.initSettings().then(
        (done) => {
          this.thumbnails = this._shared.settings.form_settings[0].value;
          this.listGrid = this._shared.settings.form_settings[1].value;
          this._shared.setApiSettings();
          this.getCategories();
        }
      );
    }
  }

  async getFeedVideos() {
    this.loading = true;
    if (!this._shared.feedVideos) {
      await this._shared.initFeed();
    }
    if (!this._shared.channel) {
      await this._shared.initChannel();
    }
    this.feedVideos = this._shared.feedVideos;
    this.channel = this._shared.channel;
    this.getChannelTrending();
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
    this.loading = false;
  }

  async resetCategories() {
    this.currentCategory = 'all';
    this.router.navigate(['category/all']);
    await this._shared.initFeed();
    await this._shared.initChannel();
    this.feedVideos = this._shared.feedVideos;
    this.channel = this._shared.channel;
    this.getChannelTrending();
  }

  onClickVideo(event: Event, i: any, list: number) {
    if (list === 3) {
      this._app.getVideo(this._shared.feedVideos[i]);
    }
  }


  onCopyVideoItemLink(i: number, list: number) {
    this._app.onCopyVideoItemLink(i, list);
  }

  addPlaylistItem(i: number, list: number) {
    this._app.addPlaylistItem(i, list);
  }

}
