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
    private globals: GlobalsService,
    private app: AppComponent,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    // INIT SETTINGS
    this.shared.getSettings();
    this.shared.setSettings();
  }

  ngOnInit() {

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
    this.shared.convertVideoObject(res2['items'], 'feedVideos');

    await this.shared.initChannel();
  }

  async getFeedVideos() {
    if (!this.globals.feedVideos) {
      await this.shared.initFeed();
    }
    await this.shared.initChannel();
    this.loading = false;
  }

  async resetCategories() {
    this.globals.currentCategory = 'all';
    this.router.navigate(['category/all']);
    await this.shared.initFeed();
    await this.shared.initChannel();
  }

  onClickVideo(event: Event, i: any, list: number) {
    if (list === 3) {
      this.app.getVideo(this.globals.feedVideos[i]);
    }
  }

  onCopyVideoItemLink(i: number, list: number) {
    this.app.onCopyVideoItemLink(i, list);
  }

  addPlaylistItem(i: number, list: number) {
    this.app.addPlaylistItem(i, list);
  }

}
