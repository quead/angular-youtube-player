import { Injectable } from '@angular/core';
import { VideoModel } from '../models/video.model';

@Injectable()
export class GlobalsService {

  relatedVideos: Array<VideoModel> = [];
  feedVideos: Array<VideoModel>;
  playlistVideos: Array<VideoModel> = [];
  lastSearchedVideos: Array<VideoModel>;
  historyVideos: Array<VideoModel> = [];
  searchedVideos: Array<VideoModel>;

  currentState = -1;
  currentVideo: VideoModel;
  shareLink: string;
  currentPlaylistItem: number;  

  categories: any;
  currentCategory: string;
  categoriesBlocked = ['19', '22', '25', '27', '29'];
  channel: any;

  internal_settings: Array<any>;
  external_settings: Array<any>;

  isLogged = false;
  thumbnails = true;
  listGrid = false;
  displayVideoPlayer = true;
  repeatMode = true;
  darkMode = true;

  regionCode = '';
  apiKey = '';
  numSearchRes = '';
  numRelatedRes = '';

  settings: any;
  player: YT.Player;

  constructor() { }

}
