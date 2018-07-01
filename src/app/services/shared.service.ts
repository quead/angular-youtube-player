import { Injectable } from '@angular/core';
import { YoutubeGetVideo } from './youtube.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { GlobalsService } from './globals.service';

@Injectable()
export class SharedService {

    notify = {
        enabled: false,
        message: 'No message'
    };

    constructor(
        private youtube: YoutubeGetVideo,
        private http: HttpClient,
        private globals: GlobalsService
    ) {}


    generateKey() {
        const code = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const length = 16;
        let rtn = '';
        for (let i = 0; i < length; i++) {
            rtn += code.charAt(Math.floor(Math.random() * code.length));
        }
        return rtn;
    }


  async getRelatedVideos() {
      if (this.globals.relatedVideos.length === 0) {
          const res = await this.youtube.relatedVideos(this.globals.currentVideo['id']);
          this.convertVideoObject(res['items'], 'relatedVideos');
      }
    }

    async initSettings() {
        const res = await this.http.get('assets/settings.json')
        .map(response => response).toPromise();
        return res;
    }

    async getSettings() {
        if (localStorage.length < 1) {
            const res = await this.initSettings();
            this.globals.settings = res;
            localStorage.setItem('settings', JSON.stringify(res));
            localStorage.setItem('session_key', this.generateKey());
        } else {
            this.globals.settings = JSON.parse(localStorage.getItem('settings'));
        }
        this.setSettings();
    }

    setSettings() {
        this.globals.apiKey = this.globals.settings.api_settings[0].value;
        this.globals.regionCode = this.globals.settings.api_settings[1].value;
        this.globals.numSearchRes = this.globals.settings.api_settings[2].value;
        this.globals.numRelatedRes = this.globals.settings.api_settings[3].value;

        this.globals.thumbnails = this.globals.settings.form_settings[0].value;
        this.globals.listGrid = this.globals.settings.form_settings[1].value;
        this.globals.displayVideoPlayer = this.globals.settings.form_settings[2].value;
        this.globals.repeatMode = this.globals.settings.form_settings[3].value;
        this.globals.darkMode = this.globals.settings.form_settings[4].value;
    }

    preventOldSettings() {
        if (localStorage.length === 1 || !localStorage.getItem('version') || localStorage.getItem('version') === '1') {
            console.log('Updating localstorage...');
            localStorage.clear();
            this.globals.settings = null;
            this.globals.playlistVideos = [];
        }
    }

    async initFeed() {
        if (!this.globals.feedVideos) {
            await this.getSettings();
            const res = await this.youtube.feedVideos();
            this.convertVideoObject(res['items'], 'feedVideos');
        }
    }

    async initChannel() {
        const res = await this.youtube.getChannel(this.globals.feedVideos[0].channelId);
        this.globals.channel = res;
    }

    updateData(state: string) {
        console.log(state);
    }

    updateLocalStorageSettings() {
        localStorage.setItem('settings', JSON.stringify(this.globals.settings));
        this.setLocalVersion();
    }

    getPlaylist() {
        this.globals.playlistVideos = JSON.parse(localStorage.getItem('playlist'));
    }

    updatePlaylist() {
        localStorage.setItem('playlist', JSON.stringify(this.globals.playlistVideos));
        this.setLocalVersion();
    }

    checkPlaylist() {
        this.findPlaylistItem();
        this.updatePlaylist();
    }

    findPlaylistItem() {
        const playlistItem = this.globals.playlistVideos.find(item => item.id === this.globals.currentVideo['id']);
        this.globals.currentPlaylistItem = this.globals.playlistVideos.indexOf(playlistItem);
    }

    setLocalVersion() {
        if (localStorage.getItem('version') === null) {
            localStorage.setItem('version', '2');
        }
    }

    triggerNotify(message: string) {
        this.notify.enabled = true;
        this.notify.message = message;
        setTimeout(() => this.notify.enabled = false, 1000);
    }

    addHistoryVideo(data: any) {
        let key;
        for (key in this.globals.historyVideos) {
            if (this.globals.historyVideos[key].id === data.id) {
                this.globals.historyVideos.splice(key, 1);
                if (this.globals.historyVideos[this.globals.historyVideos.length - 1] === data) {
                    this.globals.historyVideos.splice(-1, 1);
                }
            }
        }
        this.globals.historyVideos.unshift(data);
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
              views: ''
            },
            thumbnails: {
                default: '',
                high: '',
                medium: '',
            }
        };

        // Populate temp object
        for (const i in object) {
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
            if (obj.snippet.thumbnails.high) {
                tempObject.thumbnails.high = obj.snippet.thumbnails.high.url;
            }
            if (obj.snippet.thumbnails.medium) {
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
                    views: ''
                },
                thumbnails: {
                    default: '',
                    high: '',
                    medium: '',
                }
            };
            obj = null;
        }

        // Push tempObject into globals
        switch (list) {
            case 'playlistVideos': {
                this.globals.playlistVideos = tempVideos;
                break;
            }
            case 'feedVideos': {
                this.globals.feedVideos = tempVideos;
                break;
            }
            case 'relatedVideos': {
                this.globals.relatedVideos = tempVideos;
                break;
            }
            case 'lastSearchedVideos': {
                this.globals.lastSearchedVideos = tempVideos;
                break;
            }
            case 'searchedVideos': {
                this.globals.searchedVideos = tempVideos;
                break;
            }
            case 'currentVideo': {
                this.globals.currentVideo = tempVideos[0];
                this.globals.shareLink = 'https://youtu.be/' + tempVideos[0].id;
                tempVideos = null;
                break;
            }
            default: {
                console.log('ERROR CONVERTING VIDEOS');
                break;
            }
        }
    }

    async getStatsVideos(query: string) {
        const res = await this.youtube.statsVideos(query);
        this.convertVideoObject(res['items'], 'currentVideo');
    }

    clearPlaylist() {
        this.globals.currentPlaylistItem = -1;
        this.globals.playlistVideos = [];
        this.checkPlaylist();
    }

    clearSession() {
        this.globals.currentPlaylistItem = -1;
        this.globals.currentVideo = null;
        this.globals.playlistVideos = [];
        this.globals.relatedVideos = [];
        localStorage.removeItem('playlist');
        // localStorage.removeItem('settings');
    }

    copyShareLink() {
        document.execCommand('Copy');
        this.triggerNotify('Copied');
    }  

}
