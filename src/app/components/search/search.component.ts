import { Component, OnInit } from '@angular/core';
import { YoutubeGetVideo } from '../../services/youtube.service';
import { GlobalsService } from '../../services/globals.service';
import { SharedService } from '../../services/shared.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-search',
	templateUrl: 'search.component.html',
	styleUrls: ['search.component.scss']
})
export class SearchComponent implements OnInit {
	searchForm: FormGroup;
	noResults = false;

	constructor(
		private youtube: YoutubeGetVideo,
		private globals: GlobalsService,
		private shared: SharedService
	) {}

	ngOnInit() {
		console.log('search');
		this.initSearchInput();
	}

	async searchVideo(query: any) {
		this.globals.searchOverlay = this.searchForm.valid && this.searchForm.controls.searchInput.value.length > 0;
		const res = await this.youtube.searchVideo(query);
		this.shared.convertVideoObject(res['items'], 'searchedVideos');
		if (res['items'].length === 0) {
			this.noResults = true;
		} else {
			this.noResults = false;
		}
	}

	initSearchInput() {
		this.searchForm = new FormGroup({
			searchInput: new FormControl('', [
				Validators.required,
				Validators.minLength(1)
			])
		});

		this.searchForm.valueChanges.subscribe(form => {
			this.searchVideo(form.searchInput);
		});
	}

	clearSearch() {
		this.searchForm.reset();
		this.globals.searchedVideos = null;
	}

	onSubmit(event: Event) {
		event.preventDefault();
	}
}
