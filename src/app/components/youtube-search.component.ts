import { Component, OnInit } from '@angular/core';
import { YoutubeGetVideo } from '../services/youtube.service';
import { PlayerComponent } from '../components/player/player.component';
import { PlaylistComponent } from '../components/playlist/playlist.component';
import { GlobalsService } from '../services/globals.service';
import { SharedService } from '../services/shared.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: 'youtube-search.component.html',
})

export class SearchComponent implements OnInit {

  searchForm: FormGroup;
  noResults = false;

  constructor(
    private youtube: YoutubeGetVideo,
    private globals: GlobalsService,
    private shared: SharedService,
    private playerComp: PlayerComponent,
    private playlist: PlaylistComponent
  ) {
  }

  ngOnInit() {
    console.log('search');
    this.searchFunction();
  }

  async searchVideo(query: any) {
    const res = await this.youtube.searchVideo(query);
    this.shared.convertVideoObject(res['items'], 'searchedVideos');
    if (res['items'].length === 0) {
      this.noResults = true;
    } else {
      this.noResults = false;
    }
    this.shared.convertVideoObject(res['items'], 'lastSearchedVideos');
  }

  searchFunction() {
    this.searchForm = new FormGroup({
      searchInput: new FormControl('', [Validators.required, Validators.minLength(2)])
    });

    this.searchForm.valueChanges.subscribe((form) => {
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

  onClickVideo(event: Event, i: any, list: number) {
    if (list === 1) {
      this.playerComp.getVideo(this.globals.searchedVideos[i]);
      this.clearSearch();
    } else if (list === 3) {
      this.playerComp.getVideo(this.globals.feedVideos[i]);
    }
    this.clearSearch();
  }

  onCopyVideoItemLink(i: number, list: number) {
    this.shared.onCopyVideoItemLink(i, list);
    this.clearSearch();
  }

  addPlaylistItem(i: number, list: number) {
    this.playlist.addPlaylistItem(i, list);
    this.clearSearch();
  }
}
