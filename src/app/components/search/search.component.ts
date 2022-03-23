import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GlobalsService } from 'src/app/services/globals.service';
import { SharedService } from 'src/app/services/shared.service';
import { YoutubeService } from 'src/app/services/youtube.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  searchForm!: FormGroup;
  noResults = false;
  searchOverlay = false;

  constructor(
    private youtube: YoutubeService,
    public globals: GlobalsService,
    private shared: SharedService
  ) {}

  ngOnInit() {
    console.log('search');
    this.initSearchInput();
  }

  async searchVideo(query: any) {
    this.searchOverlay =
      this.searchForm.valid &&
      this.searchForm.controls['searchInput'].value.length > 0;
    // TODO
    const res: any = await this.youtube.searchVideo(query);
    console.log('>>>>>>>>', res);
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
        Validators.minLength(1),
      ]),
    });

    this.searchForm.valueChanges.subscribe((form) => {
      this.searchVideo(form.searchInput);
    });
  }

  clearSearch() {
    this.searchForm.reset();
    this.globals.searchedVideos = [];
  }

  onSubmit(event: Event) {
    event.preventDefault();
  }
}
