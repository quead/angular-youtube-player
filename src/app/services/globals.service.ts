import { Injectable } from '@angular/core';

@Injectable()
export class GlobalsService {

  relatedVideos: Array<any>;
  feedVideos: Array<any>;
  playlist: Array<any> = [];
  lastSearchedVideos: Array<any>;
  historyVideos: Array<any> = [];
  searchedVideos: Array<any>;
  
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
