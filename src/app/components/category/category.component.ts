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

  constructor(
    private youtube: YoutubeGetVideo,
    private shared: SharedService,
    public globals: GlobalsService,
    private app: AppComponent,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.initComponent();
  }

  async initComponent() {
    this.activatedRoute.paramMap.subscribe(data => {
      if (data['params'].id === 'all') {
        this.getFeedVideos();
      } else {
        this.globals.currentCategory = data['params'].id;
      }
      this.getCategories();
    });
  }


  async getCategories() {
    this.shared.getSettings().then(() => {
      this.youtube.categories().then(catData => {
        this.globals.categories = catData;
        if (this.globals.categories['items'].find(x => x.id === this.globals.currentCategory)) {
          this.loading = true;
          this.getCategoriesVideos(this.globals.currentCategory);
        } else {
          this.router.navigate(['']);
        }
      });
    });
  }

  async getCategoriesVideos(val: string) {
    const res2 = await this.youtube.videoCategories(val);
    this.shared.convertVideoObject(res2['items'], 'feedVideos');
    await this.shared.initChannel();
    this.loading = false;
  }

  async getFeedVideos() {
    await this.shared.initFeed();
    await this.shared.initChannel();
    this.loading = false;
  }

  async resetCategories() {
    this.loading = true;
    this.globals.currentCategory = 'all';
    this.router.navigate(['category/all']);
    this.globals.feedVideos = null;
    await this.shared.initFeed().then(() => {
      this.shared.initChannel();
      this.loading = false;
    });
  }

  onClickVideo(event: Event, i: any, list: number) {
    if (list === 3) {
      this.app.playerComp.getVideo(this.globals.feedVideos[i]);
    }
  }

  onCopyVideoItemLink(i: number, list: number) {
    this.app.onCopyVideoItemLink(i, list);
  }

  addPlaylistItem(i: number, list: number) {
    this.app.addPlaylistItem(i, list);
  }

}
