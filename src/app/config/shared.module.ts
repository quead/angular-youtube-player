import { Component, Injectable } from '@angular/core';
import { YoutubeGetVideo } from './youtube.config';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class SharedService {

    public feedVideos: Array<Object>;
    settings: Array<Object>;

    constructor(
        private youtube: YoutubeGetVideo,
        private http: Http
    ) {

    }

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
}
