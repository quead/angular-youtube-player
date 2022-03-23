import { Component, OnInit } from '@angular/core';
import { GlobalsService } from 'src/app/services/globals.service';
import { SharedService } from 'src/app/services/shared.service';
import { YoutubeService } from 'src/app/services/youtube.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  constructor(
    private youtube: YoutubeService,
    private shared: SharedService,
    public globals: GlobalsService
  ) {}

  ngOnInit() {
    this.initCategories();
  }

  initCategories() {
    // TODO
    this.youtube.categories().then((catData: any) => {
      this.converFilterObject(catData);
    });
  }

  categoryChanged(event: any) {
    // TODO
    const category = event.target['value'];
    if (category !== 'all') {
      this.globals.currentCategory = category;
      this.getCategories();
    } else {
      this.resetCategories();
    }
  }

  converFilterObject(catData: any) {
    // TODO
    const categoryArray: any[] = [];
    let categoryObject: any = {};

    catData['items'].map((category: any) => {
      categoryObject['id'] = category.id;
      categoryObject['title'] = category.snippet.title;
      categoryObject['assignable'] = category.snippet.assignable;
      categoryArray.push(categoryObject);
      categoryObject = {};
    });

    this.globals.categories = categoryArray;
  }

  getCategories() {
    this.youtube.categories().then((catData) => {
      this.converFilterObject(catData);
      this.getCategoriesVideos(this.globals.currentCategory);
    });
  }

  async getCategoriesVideos(val: string) {
    this.globals.loadingState.feed = true;
    // TODO
    const res: any = await this.youtube.feedVideos(val);
    this.shared.convertVideoObject(res['items'], 'feedVideos');
    this.globals.loadingState.feed = false;
  }

  resetCategories() {
    this.globals.loadingState.feed = true;
    this.globals.currentCategory = 'all';
    this.globals.feedVideos = [];
    this.shared.initFeed().then(() => {
      this.globals.loadingState.feed = false;
    });
  }
}
