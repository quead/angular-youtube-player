import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalsService } from './globals.service';

@Injectable()
export class YoutubeGetVideo {

    private url = 'https://www.googleapis.com/youtube/v3/';
    private videoDetails = 'part=snippet,statistics';
    private channelDetails = 'part=brandingSettings';
    private feedDetails = '&chart=mostPopular';

    constructor(
        private http: HttpClient,
        private globals: GlobalsService,
    ) {}

    async feedVideos() {
        if (this.globals.apiKey) {
            const res = await this.http.get(`${this.url}videos?${this.videoDetails}${this.feedDetails}&regionCode=${this.globals.regionCode}&maxResults=25&key=${this.globals.apiKey}`).pipe(
            map(response => response)).toPromise();
            return res;
        }
    }

    async relatedVideos(query: string) {
        if (this.globals.apiKey) {
            const res = await this.http.get(`${this.url}search?part=snippet&relatedToVideoId=${query}&maxResults=${this.globals.numRelatedRes}&type=video&key=${this.globals.apiKey}`).pipe(
            map(response => response)).toPromise();
            return res;
        }
    }

    async searchVideo(query: string) {
        if (this.globals.apiKey) {
            const res = await this.http.get(`${this.url}search?part=snippet&q=${query}&maxResults=${this.globals.numRelatedRes}&type=video&regionCode=${this.globals.regionCode}&key=${this.globals.apiKey}`).pipe(
            map(response => response)).toPromise();
            return res;
        }
    }

    async categories() {
        if (this.globals.apiKey) {
            const res = await this.http.get(`${this.url}videoCategories?part=snippet&regionCode=${this.globals.regionCode}&key=${this.globals.apiKey}`).pipe(
            map(response => response)).toPromise();
            return res;
        }
    }

    async videoCategories(category: string) {
        if (this.globals.apiKey) {
            const res = await this.http.get(`${this.url}videos?part=snippet,contentDetails,statistics&chart=mostPopular&maxResults=25&videoCategoryId=${category}&regionCode=${this.globals.regionCode}&key=${this.globals.apiKey}`).pipe(
            map(response => response)).toPromise();
            return res;
        }
    }

    async statsVideos(query: string) {
        if (this.globals.apiKey) {
            const res = await this.http.get(`${this.url}videos?${this.videoDetails}&id=${query}&key=${this.globals.apiKey}`).pipe(
            map(response => response)).toPromise();
            return res;
        }
    }
}
