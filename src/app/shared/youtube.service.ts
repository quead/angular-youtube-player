import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class YoutubeGetVideo {


    private apiKey: string;
    private url = 'https://www.googleapis.com/youtube/v3/';
    public regionCode: string;
    private numSearchRes: string;
    private numRelatedRes: string;
    private videoDetails = 'part=snippet,contentDetails,statistics,status';
    private channelDetails = 'part=brandingSettings,snippet,contentDetails,statistics';
    private feedDetails = '&chart=mostPopular';
    private settings: Array<any>;

    constructor(
        private http: HttpClient,
    ) {}

    defaultApiSet(data: any) {
        this.settings = data.api_settings;
        this.apiKey = this.settings[0].value;
        this.regionCode = this.settings[1].value;
        this.numSearchRes = this.settings[2].value;
        this.numRelatedRes = this.settings[3].value;
    }

    // Calling 1 time
    async getChannel(query: string) {
        if (this.apiKey) {
            const res = await this.http.get(`${this.url}channels?${this.channelDetails}&id=${query}&key=${this.apiKey}`)
            .map(response => response).toPromise();
            return res;
        }
    }

    // Calling 2 times
    async feedVideos() {
        if (this.apiKey) {
            const res = await this.http.get(`${this.url}videos?${this.videoDetails}${this.feedDetails}&regionCode=${this.regionCode}&maxResults=25&key=${this.apiKey}`)
            .map(response => response).toPromise();
            return res; 
        }
    }

    // Calling 1 time
    async relatedVideos(query: string) {
        if (this.apiKey) {
            const res = await this.http.get(`${this.url}search?part=snippet&relatedToVideoId=${query}&maxResults=${this.numRelatedRes}&type=video&key=${this.apiKey}`)
            .map(response => response).toPromise();
            return res;
        }
    }
    
    async searchVideo(query: string) {
        if (this.apiKey) {
            const res = await this.http.get(`${this.url}search?part=snippet&q=${query}&maxResults=${this.numRelatedRes}&type=video&regionCode=${this.regionCode}&key=${this.apiKey}`)
            .map(response => response).toPromise();
            return res;
        }
    }

    async categories() {
        if (this.apiKey) {
            const res = await this.http.get(`${this.url}videoCategories?part=snippet&regionCode=${this.regionCode}&key=${this.apiKey}`)
            .map(response => response).toPromise();
            return res;
        }
    }

    async videoCategories(category: number) {
        if (this.apiKey) {
            const res = await this.http.get(`${this.url}videos?part=snippet,contentDetails&chart=mostPopular&maxResults=25&videoCategoryId=${category}&regionCode=${this.regionCode}&key=${this.apiKey}`)
            .map(response => response).toPromise();
            return res;
        }
    }
    
    async statsVideos(query: string) {
        if (this.apiKey) {
            const res = await this.http.get(`${this.url}videos?${this.videoDetails}&id=${query}&key=${this.apiKey}`)
            .map(response => response).toPromise();
            return res;
        }
    }
}
