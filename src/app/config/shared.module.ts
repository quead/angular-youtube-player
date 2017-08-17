import { Component, Injectable } from '@angular/core';
import { YoutubeGetVideo } from './youtube.config';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class SharedService {

    public feedVideos: Array<Object>;
    public settings: Array<Object>;
    public channel: Array<Object>;

    notify = {
        enabled: false,
        message: 'No message'
    };

    constructor(
        private youtube: YoutubeGetVideo,
        private http: Http
    ) {}

    getFeed(): Observable<any> {
        return new Observable(observer => {
            if (this.feedVideos) {
                observer.next(this.feedVideos);
                return observer.complete();
            }
            this.getSettings().subscribe(data => {
                this.setApiSettings();
                this.settings = data;
                this.youtube.feedVideos().subscribe(
                    result => {
                        this.feedVideos = result.items;
                        this.youtube.getChannel(result.items[0].snippet.channelId).subscribe(
                        resultChannel => {
                            this.channel = resultChannel;
                        });
                        observer.next(this.feedVideos);
                        observer.complete();
                    },
                    error => {
                        console.log('error on feed videos' + error);
                    }
                );
            });
        });
    }

    getChannel(query: any): Observable<any> {
        return new Observable(observer => {
            if (this.channel) {
                observer.next(this.channel);
                return observer.complete();
            } else {
                this.youtube.getChannel(query).subscribe(
                    result => {
                        this.channel = result;
                        observer.next(this.channel);
                        observer.complete();
                    },
                    error => {
                        console.log('error on get channel ' + error);
                    }
                );
            }
        });
    }

    getSettings(): Observable<any> {
        return new Observable(observer => {
            if (this.settings) {
                observer.next(this.settings);
                return observer.complete();
            } else {
                this.http.get('assets/settings.json')
                    .map(res => res.json())
                    .subscribe(
                    data => {
                        this.settings = data;
                        observer.next(this.settings);
                        observer.complete();
                    },
                    error => {
                        console.log('error on get settings ' + error);
                    }
                );
            }
        });
    }

    setApiSettings() {
        this.youtube.defaultApiSet(this.settings);
    }

    // Not finished
    triggerNotify(message: string) {
        this.notify.enabled = true;
        this.notify.message = message;
        setTimeout(() => this.notify.enabled = false, 1000);
    }
}
