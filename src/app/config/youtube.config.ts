import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class YoutubeGetVideo {

    private url = 'https://www.googleapis.com/youtube/v3/';
    private regionCode = 'RO';
    private videoDetails = 'part=snippet,contentDetails,statistics,status';
    private feedDetails = '&chart=mostPopular&regionCode=' + this.regionCode;
    private apiKey = 'AIzaSyDcMvWlqPTHg7rHm-CTVXJwpaVGXKu7cBc';

    constructor(private http: Http) {}

    searchVideo(query: string) {
        return this.http.get(this.url + 'search?part=snippet&q=' + query + '&maxResults=15&type=video&key=' + this.apiKey)
            .map(response => response.json());
    }

    relatedVideos(query: string) {
        return this.http.get(this.url + 'search?part=snippet&relatedToVideoId=' + query + '&maxResults=15&type=video&key=' + this.apiKey)
            .map(response => response.json());
    }

    feedVideos() {
        return this.http.get(this.url + 'videos?' + this.videoDetails + this.feedDetails + '&maxResults=25&key=' + this.apiKey)
            .map(response => response.json());
    }
}
