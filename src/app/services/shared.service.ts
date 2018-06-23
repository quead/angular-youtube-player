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

    async initFeed() {
        await this.getSettings();
        const res = await this.youtube.feedVideos();
        this.convertVideoObject(res['items'], 'feedVideos');
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

    setLocalVersion() {
        if (localStorage.getItem('version') === null) {
            localStorage.setItem('version', '1');
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
        }

        // Populate temp object
        for (let i in object) {
            if (typeof object[i].id == 'string') {
                tempObject.id = object[i].id
            } else {
                tempObject.id = object[i].id.videoId
            }
            tempObject.title = object[i].snippet.title;
            tempObject.channelTitle = object[i].snippet.channelTitle;
            if (object[i].snippet.channelId) {
                tempObject.channelId = object[i].snippet.channelId;
            }
            if (object[i].snippet.categoryId) {
                tempObject.categoryId = object[i].snippet.categoryId;
            }
            if (object[i].snippet.thumbnails.default) {
                tempObject.thumbnails.default = object[i].snippet.thumbnails.default.url;
            }
            if (object[i].snippet.thumbnails.high) {
                tempObject.thumbnails.high = object[i].snippet.thumbnails.high.url;
            }
            if (object[i].snippet.thumbnails.medium) {
                tempObject.thumbnails.medium = object[i].snippet.thumbnails.medium.url;
            }
            if (object[i].statistics) {
                tempObject.stats.dislikes = object[i].statistics.dislikeCount;
            }
            if (object[i].statistics) {
                tempObject.stats.likes = object[i].statistics.likeCount;
            }
            if (object[i].statistics) {
                tempObject.stats.views = object[i].statistics.viewCount;
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
            }
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
                this.globals.currentVideo = tempObject;
                break;
            }
            default: {
                console.log('ERROR CONVERTING VIDEOS');
                break;
            }
        }
    }
}
