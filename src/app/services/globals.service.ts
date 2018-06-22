import { Injectable } from '@angular/core';
import { IFeedVideo } from '../models/feed-video.model';
import { ISearchVideo } from '../models/search-video.model';
import { IRelatedVideo } from '../models/related-video.model';

@Injectable()
export class GlobalsService {

  relatedVideos: Array<IRelatedVideo>;
  feedVideos: Array<IFeedVideo>;
  playlist: Array<any> = [];
  lastSearchedVideos: Array<any>;
  historyVideos: Array<any> = [];
  searchedVideos: Array<ISearchVideo>;

  categories: any;
  currentCategory: string;
  categoriesBlocked = ['19', '22', '25', '27', '29'];
  channel: any;

  internal_settings: Array<any>;
  external_settings: Array<any>;

  isLogged = false;
  thumbnails = true;
  listGrid = false;

  settings: any;

  constructor() { }

}
