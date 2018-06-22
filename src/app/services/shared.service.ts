import { Injectable } from '@angular/core';
import { YoutubeGetVideo } from './youtube.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { GlobalsService } from './globals.service';

@Injectable()
export class SharedService {

    public historyVideos: Array<any> = [];
    public settings: any;
    public channel: any;
    public isLogged = false;

    _update: any;

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

    async getSettings() {
        if (localStorage.length < 1) {
            const res = await this.initSettings();
            this.settings = res;
            localStorage.setItem('settings', JSON.stringify(res));
            localStorage.setItem('session_key', this.generateKey());
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
        this.globals.feedVideos = res['items'];
    }

    async initChannel() {
        const res = await this.youtube.getChannel(this.globals.feedVideos[0].snippet.channelId);
        this.globals.channel = res;
    }

    async setApiSettings() {
        if (this.settings) {
            this.youtube.defaultApiSet(this.settings);
        } else {
            await this.getSettings();
            this.youtube.defaultApiSet(this.settings);
        }
    }

    updateData(state: string) {
        console.log(state);
    }

    updateSettings() {
        localStorage.setItem('settings', JSON.stringify(this.settings));
        this.setLocalVersion();
    }

    getPlaylist() {
        this.globals.playlist = JSON.parse(localStorage.getItem('playlist'));
    }

    updatePlaylist() {
        localStorage.setItem('playlist', JSON.stringify(this.globals.playlist));
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
}
