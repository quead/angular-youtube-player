import { Component, OnInit } from '@angular/core';
import { YoutubeGetVideo } from '../../services/youtube.service';
import { PlayerComponent } from '../../components/player/player.component';
import { PlaylistComponent } from '../../components/playlist/playlist.component';
import { SharedService } from '../../services/shared.service';
import { GlobalsService } from '../../services/globals.service';

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
    public playlist: PlaylistComponent,
    private playerComp: PlayerComponent,
  ) {
  }

  ngOnInit() {
    this.initTrending();
  }

  initTrending() {
    this.youtube.categories().then(catData => {
        this.globals.categories = catData;
        this.loading = false;
    });
  }

  categoryChanged(event: Event) {
    const category = event.target['value'];
    if (category !== 'all') {
        this.globals.currentCategory = category;
        this.getCategories();
    } else {
        this.globals.currentCategory = 'all';
        this.globals.feedVideos = null;
        this.shared.initFeed().then(() => {
            this.loading = false;
        });
    }
  }

  getCategories() {
    this.youtube.categories().then(catData => {
        this.globals.categories = catData;
        this.loading = true;
        this.getCategoriesVideos(this.globals.currentCategory);
    });
  }

  async getCategoriesVideos(val: string) {
    const res2 = await this.youtube.videoCategories(val);
    this.shared.convertVideoObject(res2['items'], 'feedVideos');
    this.loading = false;
  }

  resetCategories() {
    this.loading = true;
    this.globals.currentCategory = 'all';
    this.globals.feedVideos = null;
    this.shared.initFeed().then(() => {
        this.loading = false;
    });
  }

  onClickVideo(i: any, list: number) {
    if (list === 0) {
        this.playerComp.getVideo(this.globals.feedVideos[i]);
    }
  }
}
