import { Component, OnInit } from '@angular/core';
import { YoutubeGetVideo } from '../../services/youtube.service';
import { AppComponent } from '../../app.component';
import { SharedService } from '../../services/shared.service';
import { GlobalsService } from '../../services/globals.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
})
export class CategoryComponent implements OnInit {

  loading = true;

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
    private globals: GlobalsService,
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
        this.globals.currentCategory = data['params'].id;
      }
      this.initCategories();
    });
  }


  async getCategories() {
    const res = await this.youtube.categories();
    this.globals.categories = res;
    if (res) {
      if (res['items'].find(x => x.id === this.globals.currentCategory)) {
        this.getCategoriesVideos(this.globals.currentCategory);
      } else {
        this.router.navigate(['']);
      }
    }
  }

  async getCategoriesVideos(val: string) {
    const res2 = await this.youtube.videoCategories(val);
    this.globals.feedVideos = res2['items'];

    await this._shared.initChannel();
    this.getChannelTrending();
  }

  async initCategories() {
    this._shared.setApiSettings();
    if (this.globals.settings) {
      this.getCategories();
    } else {
      await this._shared.initSettings().then(
        (done) => {
          this.getCategories();
        }
      );
    }
  }

  async getFeedVideos() {
    this.loading = true;
    if (!this.globals.feedVideos) {
      await this._shared.initFeed();
    }
    if (!this.globals.channel) {
      await this._shared.initChannel();
    }
    this.getChannelTrending();
  }

  getChannelTrending() {
    this.trendingFirst.video.id = this.globals.feedVideos[0].id;
    this.trendingFirst.video.title = this.globals.feedVideos[0].snippet.title;
    this.trendingFirst.video.img = this.globals.feedVideos[0].snippet.thumbnails.medium.url;
    this.trendingFirst.video.stats.likes = this.globals.feedVideos[0].statistics.likeCount;
    this.trendingFirst.video.stats.dislikes = this.globals.feedVideos[0].statistics.dislikeCount;
    this.trendingFirst.video.stats.views = this.globals.feedVideos[0].statistics.viewCount;
    this.trendingFirst.bannerURL = this.globals.channel.items[0].brandingSettings.image.bannerTabletHdImageUrl;
    this.trendingFirst.video.channelTitle = this.globals.channel.items[0].snippet.title;
    if (!this.globals.channel.items[0].statistics.hiddenSubscriberCount) {
      this.trendingFirst.stats.subscribers = this.globals.channel.items[0].statistics.subscriberCount;
    } else {
      this.trendingFirst.stats.subscribers = '0';
    }
    this.trendingFirst.stats.videoCount = this.globals.channel.items[0].statistics.videoCount;
    this.trendingFirst.stats.views = this.globals.channel.items[0].statistics.viewCount;
    this.loading = false;
  }

  async resetCategories() {
    this.globals.currentCategory = 'all';
    this.router.navigate(['category/all']);
    await this._shared.initFeed();
    await this._shared.initChannel();
    this.getChannelTrending();
  }

  onClickVideo(event: Event, i: any, list: number) {
    if (list === 3) {
      this._app.getVideo(this.globals.feedVideos[i]);
    }
  }

  onCopyVideoItemLink(i: number, list: number) {
    this._app.onCopyVideoItemLink(i, list);
  }

  addPlaylistItem(i: number, list: number) {
    this._app.addPlaylistItem(i, list);
  }

}
