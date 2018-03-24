import { Injectable } from '@angular/core';
import { YoutubeGetVideo } from './youtube.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class SharedService {

    public feedVideos: Array<any>;
    public lastSearchedVideos: Array<any>;
    public historyVideos: Array<any> = [];
    public settings: any;
    public channel: any;
    public videoCategories: any;
    public playlist: any;
    public user: any;

    _update: any;

    notify = {
        enabled: false,
        message: 'No message'
    };

    constructor(
        private youtube: YoutubeGetVideo,
        private http: HttpClient,
    ) {}

    async getSettings() {
        if (localStorage.length <= 1) {
            const res = await this.initSettings();
            this.settings = res;
            localStorage.setItem('settings', JSON.stringify(res));
            console.log(localStorage.getItem('settings'));
        } else {
            this.settings = JSON.parse(localStorage.getItem('settings'));
        }
    }

    async initSettings() {
        const res = await this.http.get('assets/settings.json')
        .map(response => response).toPromise();
        return res;
    }

    async initFeed() {
        await this.setApiSettings();
        const res = await this.youtube.feedVideos();
        this.feedVideos = res['items'];
    }

    async initChannel() {
        const res = await this.youtube.getChannel(this.feedVideos[0].snippet.channelId);
        this.channel = res;
    }

    async setApiSettings() {
        if (this.settings) {
            this.youtube.defaultApiSet(this.settings);
        } else {
            await this.getSettings();
            this.youtube.defaultApiSet(this.settings);
        }
    }

    updateSettings() {
        localStorage.setItem('settings', JSON.stringify(this.settings));
        this.setLocalVersion();
    }

    getPlaylist() {
        this.playlist = JSON.parse(localStorage.getItem('playlist'));
    }

    updatePlaylist() {
        localStorage.setItem('playlist', JSON.stringify(this.playlist));
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
        for (key in this.historyVideos) {
            if (this.historyVideos[key].id === data.id) {
                this.historyVideos.splice(key, 1);
                if (this.historyVideos[this.historyVideos.length - 1] === data) {
                    this.historyVideos.splice(-1, 1);
                }
            }
        }
        this.historyVideos.unshift(data);
    }
}
