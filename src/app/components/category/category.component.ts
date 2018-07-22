import { Component, OnInit } from '@angular/core';
import { YoutubeGetVideo } from '../../services/youtube.service';
import { PlayerComponent } from '../../components/player/player.component';
import { PlaylistComponent } from '../../components/playlist/playlist.component';
import { SharedService } from '../../services/shared.service';
import { GlobalsService } from '../../services/globals.service';
import { Router, ActivatedRoute } from '@angular/router';

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
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.initTrending();
  }

  initTrending() {
    this.activatedRoute.paramMap.subscribe(data => {
      if (data['params'].id !== 'all') {
        this.globals.currentCategory = data['params'].id;
        this.getCategories();
      } else {
        this.youtube.categories().then(catData => {
          this.globals.categories = catData;
          this.loading = false;
        });
      }
    });
  }


  getCategories() {
    this.youtube.categories().then(catData => {
      this.globals.categories = catData;
      if (this.globals.categories['items'].find(x => x.id === this.globals.currentCategory)) {
        this.loading = true;
        this.getCategoriesVideos(this.globals.currentCategory);
      } else {
        this.router.navigate(['']);
      }
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
    this.router.navigate(['category/all']);
    this.globals.feedVideos = null;
    this.shared.initFeed().then(() => {
      this.loading = false;
    });
  }

  onClickVideo(event: Event, i: any, list: number) {
    if (list === 3) {
      this.playerComp.getVideo(this.globals.feedVideos[i]);
    }
  }

  onCopyVideoItemLink(i: number, list: number) {
    this.shared.onCopyVideoItemLink(i, list);
  }

  addPlaylistItem(i: number, list: number) {
    this.playlist.addPlaylistItem(i, list);
  }

}
