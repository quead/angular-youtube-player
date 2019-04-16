import { Injectable, ElementRef } from '@angular/core';
import { VideoModel } from '../models/video.model';
import { SettingsModel } from '../models/settings.model';
import { environment } from '../../environments/environment';

@Injectable()
export class GlobalsService {

  relatedVideos: Array<VideoModel> = [];
  feedVideos: Array<VideoModel>;
  playlistVideos: Array<VideoModel> = [];
  historyVideos: Array<VideoModel> = [];
  searchedVideos: Array<VideoModel>;

  currentState = -1;
  currentVideo: VideoModel;
  shareLink: string;
  currentPlaylistItem: number;

  categories: any;
  currentCategory = 'all';
  categoriesBlocked = ['19', '22', '25', '27', '29'];
  channel: any;

  videoItemIDvalue: any;

  isLogged = false;
  isLoading = true;
  thumbnails = true;
  listGrid = false;
  repeatMode = true;
  isTempSessionActive = false;
  sessionValue: string;
  localStorageVersion = environment.storageVersion;

  regionCode: string;
  apiKey: string;
  numSearchRes: number;
  numRelatedRes: number;

  settings: SettingsModel;
  player: any;
  myScrollContainer: ElementRef;

  constructor() { }

  getCurrentSessionKeys() {
    return {
      session: localStorage.getItem('session_key'),
      tempSession: this.sessionValue
    };
  }

}
