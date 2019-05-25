import { Component, OnInit } from '@angular/core';
import { YoutubeGetVideo } from '../../services/youtube.service';
import { SharedService } from '../../services/shared.service';
import { GlobalsService } from '../../services/globals.service';

@Component({
	selector: 'app-category',
	templateUrl: './category.component.html',
	styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

	constructor(
		private youtube: YoutubeGetVideo,
		private shared: SharedService,
		public globals: GlobalsService
	) { }

	ngOnInit() {
		this.initCategories();
	}

	initCategories() {
		this.youtube.categories().then(catData => {
			this.globals.categories = catData;
		});
	}

	categoryChanged(event: Event) {
		const category = event.target['value'];
		if (category !== 'all') {
			this.globals.currentCategory = category;
			this.getCategories();
		} else {
			this.resetCategories();
		}
	}

	getCategories() {
		this.youtube.categories().then(catData => {
			this.globals.categories = catData;
			this.globals.isFeedLoading = true;
			this.getCategoriesVideos(this.globals.currentCategory);
		});
	}

	async getCategoriesVideos(val: string) {
		const res2 = await this.youtube.videoCategories(val);
		this.shared.convertVideoObject(res2['items'], 'feedVideos');
		this.globals.isFeedLoading = false;
	}

	resetCategories() {
		this.globals.isFeedLoading = true;
		this.globals.currentCategory = 'all';
		this.globals.feedVideos = null;
		this.shared.initFeed().then(() => {
			this.globals.isFeedLoading = false;
		});
	}
}
