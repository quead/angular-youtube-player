import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { VideoModel } from '../models/video.model';
import { GlobalsService } from './globals.service';
import { NotifyService } from './notify.service';
import { SessionManagerService } from './session-manager.service';
import { YoutubeService } from './youtube.service';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor(
    private youtube: YoutubeService,
    private globals: GlobalsService,
    private notify: NotifyService,
    private session: SessionManagerService
  ) {}

  guid() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  async getRelatedVideos() {
    try {
      // TODO
      const res: any = await this.youtube.relatedVideos(
        this.globals.currentVideo['id']
      );
      this.convertVideoObject(res['items'], 'relatedVideos');
      this.globals.loadingState.related = false;
    } catch {}
  }

  getSettings() {
    if (localStorage.length < 1 || localStorage.getItem('settings') == null) {
      this.globals.settings = environment.settings;
      localStorage.setItem('settings', JSON.stringify(environment.settings));
    } else {
      this.globals.settings = JSON.parse(localStorage.getItem('settings')!);
    }
    this.setSettings();
  }

  setSettings() {
    this.globals.apiKey = this.globals.settings.api_settings.key.value;
    this.globals.regionCode = this.globals.settings.api_settings.region.value;
    this.globals.numSearchRes =
      this.globals.settings.api_settings.search_num.value;
    this.globals.numRelatedRes =
      this.globals.settings.api_settings.related_num.value;

    this.globals.thumbnails =
      this.globals.settings.form_settings.thumbnails.value;
    this.globals.listGrid =
      this.globals.settings.form_settings.listToggle.value;
    this.globals.repeatMode = this.globals.settings.form_settings.repeat.value;
  }

  preventOldSettings() {
    if (
      localStorage.length === 1 ||
      !localStorage.getItem('version') ||
      parseInt(localStorage.getItem('version')!, 10) <
        this.globals.localStorageVersion
    ) {
      console.log('Updating localstorage...');
      localStorage.clear();
      // TODO
      this.globals.settings = null!;
      this.globals.playlistVideos = [];
    }
  }

  async initFeed(category?: string, token?: string) {
    const res: any = await this.youtube.feedVideos(category, token);
    return new Promise((resolve, reject) => {
      try {
        // TODO
        // res.subscribe((data: any) => {
        this.convertVideoObject(res['items'], 'feedVideos');
        return resolve(res);
        // });
      } catch (e) {
        return reject(e);
      }
    });
  }

  updateLocalStorageSettings() {
    localStorage.setItem('settings', JSON.stringify(this.globals.settings));
    this.setLocalVersion();
  }

  checkPlaylist() {
    this.findPlaylistItem();
    this.session.updateSession('playlist', this.globals.playlistVideos);
    this.setLocalVersion();
  }

  findPlaylistItem() {
    if (this.globals.currentVideo) {
      const playlistItem = this.globals.playlistVideos.find(
        (item) => item.id === this.globals.currentVideo['id']
      );
      this.globals.currentPlaylistItem =
        (playlistItem && this.globals.playlistVideos.indexOf(playlistItem)) ||
        0;
    }
  }

  setLocalVersion() {
    if (
      localStorage.getItem('version') === null ||
      parseInt(localStorage.getItem('version')!, 10) <
        this.globals.localStorageVersion
    ) {
      localStorage.setItem(
        'version',
        this.globals.localStorageVersion.toString()
      );
    }
  }

  move(arr: Array<VideoModel>, old_index: number, new_index: number) {
    while (old_index < 0) {
      old_index += arr.length;
    }
    while (new_index < 0) {
      new_index += arr.length;
    }
    if (new_index >= arr.length) {
      let k = new_index - arr.length;
      while (k-- + 1) {
        // arr.push(undefined);
      }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr;
  }

  addHistoryVideo(data: VideoModel) {
    if (
      typeof this.globals.historyVideos.find(
        (video) => video.id === data.id
      ) === 'undefined'
    ) {
      this.globals.historyVideos.unshift(data);
    } else {
      const indexVideo = this.globals.historyVideos.indexOf(data);
      this.move(this.globals.historyVideos, indexVideo, 0);
    }
  }

  updateClientName(name: string) {
    this.globals.clientName = name;
    localStorage.setItem('clientName', name);
  }

  // TODO
  getVideoFromList(i: number, listIndex: number): any {
    let videoSelected;

    switch (listIndex) {
      case 0:
        videoSelected = this.globals.feedVideos[i];
        break;
      case 1:
        videoSelected = this.globals.searchedVideos[i];
        break;
      case 2:
        videoSelected = this.globals.relatedVideos[i];
        break;
      case 3:
        videoSelected = this.globals.playlistVideos[i];
        break;
      case 4:
        videoSelected = this.globals.historyVideos[i];
        break;
      default:
    }

    return videoSelected;
  }

  convertVideoObject(object: any, list: string) {
    let tempVideos = [];
    let tempObject = {
      id: '',
      title: '',
      channelTitle: '',
      channelId: '',
      categoryId: '',
      stats: {
        likes: '',
        dislikes: '',
        views: '',
      },
      thumbnails: {
        default: '',
        high: '',
        medium: '',
      },
    };

    // Populate temp object
    for (const i in object) {
      if (object.hasOwnProperty(i)) {
        let obj = object[i];

        if (typeof obj.id === 'string') {
          tempObject.id = obj.id;
        } else {
          tempObject.id = obj.id.videoId;
        }
        tempObject.title = obj.snippet.title;
        tempObject.channelTitle = obj.snippet.channelTitle;
        if (obj.snippet.channelId) {
          tempObject.channelId = obj.snippet.channelId;
        }
        if (obj.snippet.categoryId) {
          tempObject.categoryId = obj.snippet.categoryId;
        }
        if (obj.snippet.thumbnails.default) {
          tempObject.thumbnails.default = obj.snippet.thumbnails.default.url;
        }
        if (obj.snippet.thumbnails.maxres) {
          tempObject.thumbnails.high = obj.snippet.thumbnails.maxres.url;
        } else if (obj.snippet.thumbnails.high) {
          tempObject.thumbnails.high = obj.snippet.thumbnails.high.url;
        }
        if (obj.snippet.thumbnails.high) {
          tempObject.thumbnails.medium = obj.snippet.thumbnails.high.url;
        } else if (obj.snippet.thumbnails.medium) {
          tempObject.thumbnails.medium = obj.snippet.thumbnails.medium.url;
        }
        if (obj.statistics) {
          tempObject.stats.dislikes = obj.statistics.dislikeCount;
        }
        if (obj.statistics) {
          tempObject.stats.likes = obj.statistics.likeCount;
        }
        if (obj.statistics) {
          tempObject.stats.views = obj.statistics.viewCount;
        }

        tempVideos.push(tempObject);

        // Clear tempObject after populated the object and pushed
        tempObject = {
          id: '',
          title: '',
          channelTitle: '',
          channelId: '',
          categoryId: '',
          stats: {
            likes: '',
            dislikes: '',
            views: '',
          },
          thumbnails: {
            default: '',
            high: '',
            medium: '',
          },
        };
        obj = null;
      }
    }

    // Push tempObject into globals
    switch (list) {
      case 'playlistVideos': {
        this.globals.playlistVideos = tempVideos;
        break;
      }
      case 'feedVideos': {
        tempVideos.pop();
        this.globals.feedVideos = tempVideos;
        break;
      }
      case 'relatedVideos': {
        console.log('>>>>>>');
        this.globals.relatedVideos = tempVideos;
        break;
      }
      case 'searchedVideos': {
        this.globals.searchedVideos = tempVideos;
        break;
      }
      case 'currentVideo': {
        this.globals.currentVideo = tempVideos[0];
        this.globals.shareLink = 'https://youtu.be/' + tempVideos[0].id;
        tempVideos = [];
        break;
      }
      default: {
        console.log('ERROR CONVERTING VIDEOS');
        break;
      }
    }
    return true;
  }

  async getStatsVideos(id: string) {
    // TODO
    const res: any = await this.youtube.statsVideos(id);
    this.convertVideoObject(res['items'], 'currentVideo');
  }

  clearPlaylist() {
    this.globals.currentPlaylistItem = -1;
    this.globals.playlistVideos = [];
    this.checkPlaylist();
  }

  // TODO
  copyShareLink() {
    document.execCommand('Copy');
    this.notify.triggerNotify(20);
  }

  onCopyVideoItemLink(i: number, list: number) {
    const youtubeLink = 'https://youtu.be/';

    // TODO
    // this.globals.videoItemIDvalue.nativeElement.value =
    //   youtubeLink + this.getVideoFromList(i, list).id;

    this.globals.videoItemIDvalue.nativeElement.select();
    this.globals.videoItemIDvalue.nativeElement.focus();
    // TODO
    // document.execCommand('copy');
    this.globals.videoItemIDvalue.nativeElement.blur();
    this.copyShareLink();
  }
}
